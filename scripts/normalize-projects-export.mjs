import { readFileSync, writeFileSync } from "node:fs";

const INPUT_PATH = process.argv[2] || "projects-export.json";
const OUTPUT_PATH = process.argv[3] || "projects-normalized-export.json";

const WORD_TO_NUMBER = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

const RESULT_PATTERN = /increased|progress|result|%|promoted|appointed|compliant|updated/i;

function maybeFixMojibake(value) {
  if (typeof value !== "string") return "";
  const looksBroken = /[ÃÂâ]/.test(value);
  if (!looksBroken) return value;

  try {
    const decoded = Buffer.from(value, "latin1").toString("utf8");
    const stillBroken = /[ÃÂâ]/.test(decoded);
    return stillBroken ? value : decoded;
  } catch {
    return value;
  }
}

function sanitizeText(value) {
  if (typeof value !== "string") return "";
  const repaired = maybeFixMojibake(value);
  return repaired.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function flattenActivities(activities = []) {
  return asArray(activities)
    .flatMap((activity) => {
      if (typeof activity === "string") return [sanitizeText(activity)];
      if (activity && Array.isArray(activity.items)) {
        return activity.items.map((item) => sanitizeText(item));
      }
      return [];
    })
    .filter(Boolean);
}

function splitActivities(activityLines = []) {
  const responsibilities = [];
  const results = [];

  for (const line of activityLines) {
    if (RESULT_PATTERN.test(line)) {
      results.push(line);
    } else {
      responsibilities.push(line);
    }
  }

  return { responsibilities, results };
}

function parsePeriod(placeAndYear = "") {
  const raw = sanitizeText(placeAndYear);
  const match = raw.match(/(.*?)(?:~|\()\s*(\d{4})(?:\s*[-]\s*(\d{4})|\s*[\u2013-]\s*present|\s*present)?\)?\s*$/i);

  if (!match) {
    return {
      location: raw,
      period: {
        startYear: null,
        endYear: null,
        label: "",
      },
    };
  }

  const location = sanitizeText(match[1].replace(/[~(]+$/, ""));
  const startYear = Number(match[2]);
  const endYear = match[3] ? Number(match[3]) : null;
  const isPresent = /present/i.test(raw);

  return {
    location,
    period: {
      startYear: Number.isFinite(startYear) ? startYear : null,
      endYear: isPresent ? null : (Number.isFinite(endYear) ? endYear : null),
      label: isPresent
        ? `${startYear}-Present`
        : (endYear ? `${startYear}-${endYear}` : `${startYear}`),
    },
  };
}

function normalizeNumber(value) {
  return value.replace(",", ".");
}

function parseNumberWord(text) {
  const lower = text.toLowerCase();
  const match = lower.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/);
  if (!match) return null;
  return WORD_TO_NUMBER[match[1]] || null;
}

function extractTaggedPercents(lines, tag) {
  const values = [];
  const lowerTag = tag.toLowerCase();

  for (const line of lines) {
    for (const match of line.matchAll(/(\d+(?:[.,]\d+)?)%\s*(physical|financial)/gi)) {
      if (match[2].toLowerCase() === lowerTag) {
        values.push(normalizeNumber(match[1]));
      }
    }

  }

  return values;
}

function inferMetrics({ context = "", responsibilities = [], results = [], outcome = "" }) {
  const sourceLines = [context, ...responsibilities, ...results, outcome]
    .map((line) => sanitizeText(line))
    .filter(Boolean);

  const metrics = [];

  const physicalPercents = extractTaggedPercents(sourceLines, "physical");
  const financialPercents = extractTaggedPercents(sourceLines, "financial");

  if (physicalPercents.length > 0) {
    metrics.push({
      key: "physical_progress",
      label: "Physical Progress",
      value:
        physicalPercents.length >= 2
          ? `${physicalPercents[0]}% -> ${physicalPercents[physicalPercents.length - 1]}%`
          : `${physicalPercents[0]}%`,
      source: "inferred",
      confidence: physicalPercents.length >= 2 ? "high" : "medium",
    });
  }

  if (financialPercents.length > 0) {
    metrics.push({
      key: "financial_progress",
      label: "Financial Progress",
      value:
        financialPercents.length >= 2
          ? `${financialPercents[0]}% -> ${financialPercents[financialPercents.length - 1]}%`
          : `${financialPercents[0]}%`,
      source: "inferred",
      confidence: financialPercents.length >= 2 ? "high" : "medium",
    });
  }

  const workersLine = sourceLines.find((line) => /workers?/i.test(line));
  if (workersLine) {
    const workersDigits = workersLine.match(/(\d+)\s+workers?/i);
    if (workersDigits) {
      metrics.push({
        key: "peak_workforce",
        label: "Peak Workforce",
        value: `${workersDigits[1]} workers`,
        source: "inferred",
        confidence: "high",
      });
    }
  }

  const subcontractorLine = sourceLines.find((line) => /subcontractors?/i.test(line));
  if (subcontractorLine) {
    const subcontractorDigits = subcontractorLine.match(/(\d+)\s*\+?\s*subcontractors?/i);
    const subcontractorWord = parseNumberWord(subcontractorLine);
    const subcontractorValue = subcontractorDigits
      ? Number(subcontractorDigits[1])
      : subcontractorWord;
    if (subcontractorValue) {
      metrics.push({
        key: "subcontractors",
        label: "Subcontractors",
        value: `${subcontractorValue}+ on site`,
        source: "inferred",
        confidence: subcontractorDigits ? "high" : "medium",
      });
    }
  }

  const piecesLine = sourceLines.find((line) => /pieces?|slabs?|units?/i.test(line));
  if (piecesLine) {
    const piecesDigits = piecesLine.match(/(\d+)\s*(pieces?|slabs?|units?)/i);
    if (piecesDigits) {
      metrics.push({
        key: "structural_units",
        label: "Structural Units",
        value: `${piecesDigits[1]} ${piecesDigits[2]}`,
        source: "inferred",
        confidence: "medium",
      });
    }
  }

  const tonsLine = sourceLines.find((line) => /tons?/i.test(line));
  if (tonsLine) {
    const tonsDigits = tonsLine.match(/(\d+(?:[.,]\d+)?)\s*tons?/i);
    if (tonsDigits) {
      metrics.push({
        key: "average_load",
        label: "Average Load",
        value: `${normalizeNumber(tonsDigits[1])} tons`,
        source: "inferred",
        confidence: "medium",
      });
    }
  }

  const genericPercentLine = sourceLines.find((line) => /%/.test(line));
  if (!physicalPercents.length && !financialPercents.length && genericPercentLine) {
    const genericPercent = genericPercentLine.match(/(\d+(?:[.,]\d+)?)%/);
    if (genericPercent) {
      metrics.push({
        key: "current_progress",
        label: "Current Progress",
        value: `${normalizeNumber(genericPercent[1])}%`,
        source: "inferred",
        confidence: "low",
      });
    }
  }

  return metrics.slice(0, 6);
}

function normalizeProject(project) {
  const context = sanitizeText(project.description || "");
  const outcome = sanitizeText(project.finalDescription || "");
  const flattened = flattenActivities(project.activities);
  const split = splitActivities(flattened);
  const { location, period } = parsePeriod(project.placeandyear || "");

  const normalized = {
    id: String(project.id || "").trim(),
    slug: String(project.slug || "").trim(),
    title: sanitizeText(project.title || ""),
    categoryId: String(project.categoryId || "").trim(),
    organization: sanitizeText(project.organization || ""),
    client: sanitizeText(project.client || "") || null,
    location,
    period,
    context,
    responsibilities: split.responsibilities,
    results: split.results,
    projectOutcome: outcome,
    media: {
      mainImage: sanitizeText(project.mainImageUrl || "") || null,
      images: asArray(project.imageRefs).map((img) => sanitizeText(String(img))).filter(Boolean),
      thumbnails: asArray(project.imageThumbRefs).map((img) => sanitizeText(String(img))).filter(Boolean),
      video: null,
    },
    metrics: inferMetrics({
      context,
      responsibilities: split.responsibilities,
      results: split.results,
      outcome,
    }),
    skillsShowcased: asArray(project.skillsShowcased).map((s) => sanitizeText(String(s))).filter(Boolean),
    isVisible: Boolean(project.isVisible),
    createdAt: project.createdAt || null,
    updatedAt: project.updatedAt || null,
    migrationMeta: {
      inferredAt: new Date().toISOString(),
      metricsAreProvisional: true,
      sourceVersion: "projects-export-v1",
    },
  };

  return normalized;
}

function summarize(projects) {
  return {
    total: projects.length,
    withMetrics: projects.filter((p) => p.metrics.length > 0).length,
    withEmptyOutcome: projects.filter((p) => !p.projectOutcome).length,
    withEmptyResponsibilitiesAndResults: projects.filter(
      (p) => p.responsibilities.length === 0 && p.results.length === 0
    ).length,
    withEmptyMedia: projects.filter((p) => p.media.images.length === 0 && !p.media.mainImage).length,
  };
}

const raw = JSON.parse(readFileSync(INPUT_PATH, "utf-8"));
const inputProjects = Array.isArray(raw.projects) ? raw.projects : [];
const projects = inputProjects.map(normalizeProject);

const output = {
  exportedAt: new Date().toISOString(),
  sourceExportedAt: raw.exportedAt || null,
  count: projects.length,
  summary: summarize(projects),
  projects,
};

writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");

console.log(`Normalized ${projects.length} projects -> ${OUTPUT_PATH}`);
console.log(JSON.stringify(output.summary, null, 2));

