export function isString(data) {
  if (!data || typeof data !== 'string') return false;
  return true;
}

export function firstLetterUpper(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toPascalCase(str) {
  if (!isString(str)) return 'NotDefined';
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export function hexToRGB(hex, alpha) {

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
}

export function toDate(date) {
  let isDateValid = !isNaN(Date.parse(date));

  return new Date(isDateValid ? new Date(Date.parse(date)) : Date.now());
}