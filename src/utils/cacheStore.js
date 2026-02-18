const CACHE_PREFIX = "zepedro:cache:v1:";
export const DEFAULT_CACHE_TTL_MS = 60 * 60 * 1000;

const memoryCache = new Map();

const now = () => Date.now();

const getStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
};

const toStorageKey = (key) => `${CACHE_PREFIX}${key}`;

const isFresh = (entry) =>
  !!entry && typeof entry.expiresAt === "number" && entry.expiresAt > now();

const setMemoryEntry = (key, entry) => {
  memoryCache.set(key, entry);
};

const getMemoryEntry = (key) => {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (!isFresh(entry)) {
    memoryCache.delete(key);
    return null;
  }
  return entry;
};

const deleteMemoryEntry = (key) => {
  memoryCache.delete(key);
};

const getPersistentEntry = (key) => {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(toStorageKey(key));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!isFresh(entry)) {
      storage.removeItem(toStorageKey(key));
      return null;
    }
    return entry;
  } catch (error) {
    return null;
  }
};

const setPersistentEntry = (key, entry) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(toStorageKey(key), JSON.stringify(entry));
  } catch (error) {
    // Ignore storage failures and keep in-memory cache working.
  }
};

const deletePersistentEntry = (key) => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(toStorageKey(key));
  } catch (error) {
    // Ignore storage cleanup failures.
  }
};

const createEntry = (value, ttlMs) => ({
  value,
  expiresAt: now() + Math.max(0, ttlMs),
});

export const createCacheKey = (scope, identifier) => `${scope}:${identifier}`;

export const getCachedValue = (key, options = {}) => {
  const { persist = true } = options;

  const memoryEntry = getMemoryEntry(key);
  if (memoryEntry) return memoryEntry.value;

  if (!persist) return null;

  const persistentEntry = getPersistentEntry(key);
  if (!persistentEntry) return null;

  setMemoryEntry(key, persistentEntry);
  return persistentEntry.value;
};

export const setCachedValue = (key, value, options = {}) => {
  const { ttlMs = DEFAULT_CACHE_TTL_MS, persist = true } = options;
  const entry = createEntry(value, ttlMs);

  setMemoryEntry(key, entry);

  if (persist) {
    setPersistentEntry(key, entry);
  }
};

export const invalidateCache = (key) => {
  deleteMemoryEntry(key);
  deletePersistentEntry(key);
};

export const getOrFetchCached = async ({
  key,
  fetcher,
  ttlMs = DEFAULT_CACHE_TTL_MS,
  persist = true,
}) => {
  const cached = getCachedValue(key, { persist });
  if (cached !== null) return cached;

  const value = await fetcher();
  setCachedValue(key, value, { ttlMs, persist });
  return value;
};
