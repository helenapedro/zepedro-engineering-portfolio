import React from "react";
import { FaEnvelope, FaFileAlt, FaLinkedin, FaPhone } from "react-icons/fa";
import styles from "./Footer.module.css";
import iconStyles from "../../styles/Icons.module.css";
import { PROFILE } from "../../constants/profile";

const Footer = () => {
  const telHref = `tel:${PROFILE.phone}`;
  const mailHref = `mailto:${PROFILE.email}`;

  return (
    <div id="footer" className={styles.footer}>
      <ul className={styles.copyright}>
        <li>
          &copy;{" "}
          <a href={PROFILE.linkedInUrl} target="_blank" rel="noreferrer">
            Eng. {PROFILE.displayName}
          </a>
        </li>
        <li>
          <a href={telHref} className={iconStyles.icon}>
            <FaPhone />
          </a>
        </li>
        <li>
          <a href={mailHref} className={iconStyles.icon}>
            <FaEnvelope />
          </a>
        </li>
        <li>
          <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className={iconStyles.icon}>
            <FaFileAlt />
          </a>
        </li>
        <li>
          <a
            href={PROFILE.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className={iconStyles.icon}
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
