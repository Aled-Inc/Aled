export function isUserValid(user) {
  if (!user || typeof user !== 'object') return false;

  return true;
}
