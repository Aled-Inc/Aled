export function isString(data) {
  if (!data || typeof data !== 'string') return false;
  return true;
}

export function firstLetterUpper(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toPascalCase(str) {
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}
