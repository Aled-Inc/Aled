import { isString } from "./CommonUtils";

export function isUserValid(user) {
  if (!user || typeof user !== 'object') return false;

  return true;
}

export function haveValidCommonName(user) {
  if (!isString(user.Name)) return false;
  if (!isString(user.Surname)) return false;

  return true;
}
