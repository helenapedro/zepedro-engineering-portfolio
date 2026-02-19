import React from 'react';

export const wrapNumbersWithClass = (text, className) => {
  if (!text) return text;
  const splitRegex = /\b(\d+(?:\.\d+)?)\b/g;
  const numberRegex = /^\d+(?:\.\d+)?$/;

  return text.split(splitRegex).map((part, index) =>
    numberRegex.test(part) ? <i className={className} key={index}>{part}</i> : part
  );
};
