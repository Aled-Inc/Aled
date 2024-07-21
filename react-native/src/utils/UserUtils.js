import { isString } from "./CommonUtils";

export function isUserValid(user) {
  if (!user || typeof user !== 'object') return false;

  return true;
}

export function haveValidCommonName(user) {
  if (!isString(user.name)) return false;
  if (!isString(user.surname)) return false;

  return true;
}
