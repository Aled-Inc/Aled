import {createReducer} from '@reduxjs/toolkit';
import AppActions from '../actions/AppActions';

const initialState = {
    appConfig: {},
    modalType: null
};

export default createReducer(initialState, builder =>
    builder
      .addCase(AppActions.setAppConfig, (state, action) => {
          state.appConfig = action.payload;
      })
      .addCase(AppActions.requestConfirmationModal, (state, action) => {
        state.modalType = action?.payload?.modalType;
      }),
);
