import { string } from 'yup';

export const commonValidator = () => {
  return string()
    .required({text: 'AbpAccount::ThisFieldIsRequired.'})
    .min(2, {text: 'AbpAccount::ThisFieldMustBeGreaterThanOrEqual{0}', value: 2})
    .max(10, {text: 'AbpAccount::ThisFieldMustBeLessOrEqual{0}', value: 10});
};

export const passwordValidator = () => {
  return string()
    .required({text: 'AbpAccount::ThisFieldIsRequired.'})
    .min(8, {text: 'AbpAccount::ThisFieldMustBeGreaterThanOrEqual{0}', value: 8})
    .matches(/[a-z]/, {message: {text: 'AbpIdentity::Volo.Abp.Identity:PasswordRequiresLower'}})
    .matches(/[A-Z]/, {message: {text: 'AbpIdentity::Volo.Abp.Identity:PasswordRequiresUpper'}})
    .matches(/\d/, {message: {text: 'AbpIdentity::Volo.Abp.Identity:PasswordRequiresDigit'}})
    .matches(
      /[@$!%*?&]/,
      {message: {text: 'AbpIdentity::Volo.Abp.Identity:PasswordRequiresNonAlphanumeric'}},
    );
};

export const emailValidator = () => {
  return string()
    .email({text: 'AbpAccount::ThisFieldIsNotAValidEmailAddress.'})
    .required({text: 'AbpAccount::ThisFieldIsRequired.'});
};

export const phoneValidator = () => {
  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  return string()
    .matches(phoneRegExp, {message: {text: 'AbpAccount::ThisFieldIsNotAValidPhoneNumber.'}})
    .required({text: 'AbpAccount::ThisFieldIsRequired.'});
};

export const nullableValidator = () => {
  return string().nullable();
};

export const requiredValidator = () => {
  return string()
    .required({text: 'AbpAccount::ThisFieldIsRequired.'});
};