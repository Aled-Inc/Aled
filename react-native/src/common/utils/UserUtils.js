import { isString } from "./CommonUtils";

export function isUserValid(user) {
  return !(!user || typeof user !== 'object');
}

export function haveValidCommonName(user) {
  if (!isString(user.name)) return false;
  if (!isString(user.surname)) return false;

  return true;
}
