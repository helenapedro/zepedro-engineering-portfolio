import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as iconsfa from 'react-icons/fa';
import styles from '../../components/ui/ProjectDetails.module.css';

export interface BimModelAsset {
  url: string;
  title?: string;
  format?: string;
  sizeLabel?: string;
  source?: string;
  previewImage?: string;
}

interface BimModelViewerProps {
  asset?: BimModelAsset | null;
  resolveUrl: (assetRef: string) => string;
}

const BimModelViewer: React.FC<BimModelViewerProps> = ({ asset, resolveUrl }) => {
  const { t } = useTranslation();

  if (!asset?.url) return null;

  const modelUrl = resolveUrl(asset.url);
  const previewUrl = asset.previewImage ? resolveUrl(asset.previewImage) : '';

  return (
    <section className={styles.modelSection} aria-labelledby="project-model-title">
      <div className={styles.modelHeader}>
        <div>
          <span className={styles.modelEyebrow}>{t("model.ready")}</span>
          <h3 id="project-model-title" className={styles.sectionTitle}>
            {asset.title || t("model.title")}
          </h3>
        </div>
        <Button as="a" href={modelUrl} target="_blank" rel="noreferrer" variant="primary" className={styles.modelButton}>
          <iconsfa.FaExternalLinkAlt aria-hidden="true" />
          <span>{t("model.openModel")}</span>
        </Button>
      </div>

      <div className={styles.modelSurface}>
        {previewUrl ? (
          <img src={previewUrl} alt={asset.title || t("model.title")} className={styles.modelPreviewImage} />
        ) : (
          <div className={styles.modelWireframe} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <dl className={styles.modelMeta}>
        {asset.format && (
          <div>
            <dt>{t("model.format")}</dt>
            <dd>{asset.format}</dd>
          </div>
        )}
        {asset.sizeLabel && (
          <div>
            <dt>{t("model.size")}</dt>
            <dd>{asset.sizeLabel}</dd>
          </div>
        )}
        {asset.source && (
          <div>
            <dt>{t("model.source")}</dt>
            <dd>{asset.source}</dd>
          </div>
        )}
      </dl>

      <p className={styles.modelNote}>{t("model.previewNote")}</p>
    </section>
  );
};

export default BimModelViewer;
