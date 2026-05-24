
const raw =
  process.env.REACT_APP_CDN_BASE_URL ?? '';

const CDN = raw.endsWith('/') ? raw : `${raw}/`;

export default CDN;
