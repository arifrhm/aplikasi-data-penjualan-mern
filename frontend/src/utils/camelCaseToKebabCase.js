// File: camelCaseToKebabCase.js
const camelCaseToKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export default camelCaseToKebabCase;
