export function isString(data) {
  if (!data || typeof data !== 'string') return false;
  return true;
}

export function hexToRGB(hex, alpha) {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  console.log(`rgba(${r}, ${g}, ${b}, ${alpha})`);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}