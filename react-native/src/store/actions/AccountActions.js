import { createAction } from "@reduxjs/toolkit";

const updateUsernameAsync = createAction('account/update/username', ({ value = ''}) => ({
    payload: { value }
  })
);

const updateNameAsync = createAction('account/update/name', ({ value = null }) => ({
    payload: { value }
  })
);

const updateSurnameAsync = createAction('account/update/surname', ({ value = null }) => ({
    payload: { value }
  })
);

const updateEmailAsync = createAction('account/update/email', ({ value = ''}) => ({
    payload: { value }
  })
);

const updatePhoneAsync = createAction('account/update/phone', ({ value = null }) => ({
    payload: { value }
  })
);

const changePasswordAsync = createAction('account/change-password', ({ value, extraValue }) => ({
    payload: { value, extraValue }  
  })
);

const disableProfileAsync = createAction('account/disabled');

const deleteProfileAsync = createAction('account/delete');

export default {
  updateUsernameAsync,
  updateNameAsync,
  updateSurnameAsync,
  updateEmailAsync,
  updatePhoneAsync,
  changePasswordAsync,
  disableProfileAsync,
  deleteProfileAsync
};