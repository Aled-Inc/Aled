import { createReducer } from "@reduxjs/toolkit";
import AuthActions from "../actions/AuthActions";

const initialState = { user: null };

export default createReducer(initialState, builder =>
  builder.addCase(AuthActions.setUser, (state, action) => {
    state.user = { ...state.user, ...action.payload};
  })
);