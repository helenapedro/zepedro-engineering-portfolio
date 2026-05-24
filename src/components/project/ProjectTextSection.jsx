import React from "react";
import PropTypes from "prop-types";
import { wrapNumbersWithClass } from "../../utils/WrapNumbers";
import styles from "../../pages/projects/Project.module.css";
import prodetailsstyles from "../../components/ui/ProjectDetails.module.css";

const ProjectTextSection = ({ title, items }) => {
  if (!items.length) return null;

  return (
    <section className={prodetailsstyles.contentSection}>
      <h3 className={prodetailsstyles.sectionTitle}>{title}</h3>
      <ul className={`${styles.ulItems} ${styles["ulItems--tick"]}`}>
        {items.map((item, index) => (
          <li className={styles.projectActivityItem} key={`${title}-${index}`}>
            {wrapNumbersWithClass(item, "number")}
          </li>
        ))}
      </ul>
    </section>
  );
};

ProjectTextSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProjectTextSection;
