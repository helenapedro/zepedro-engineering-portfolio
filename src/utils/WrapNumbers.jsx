import React from 'react';

export const wrapNumbersWithClass = (text, className) => {
  if (!text) return text;
  const regex = /\b(\d+(\.\d+)?)\b/g;
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <i className={className} key={index}>{part}</i> : part
  );
};
