import React from "react";
import PropTypes from "prop-types";
import { wrapNumbersWithClass } from "../../utils/WrapNumbers";
import prodetailsstyles from "../../components/ui/ProjectDetails.module.css";

const ProjectMetrics = ({ stats, numberClassName }) => {
  if (!stats.length) return null;

  return (
    <section className={prodetailsstyles.metricsSection} aria-label="Project highlights">
      {stats.map((metric, idx) => (
        <div className={prodetailsstyles.metricCard} key={`${metric.label}-${idx}`}>
          <span className={prodetailsstyles.metricLabel}>{metric.label}</span>
          <strong className={prodetailsstyles.metricValue}>
            {wrapNumbersWithClass(metric.value, numberClassName)}
          </strong>
        </div>
      ))}
    </section>
  );
};

ProjectMetrics.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  numberClassName: PropTypes.string.isRequired,
};

export default ProjectMetrics;
