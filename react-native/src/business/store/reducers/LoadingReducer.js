import {createReducer} from '@reduxjs/toolkit';
import LoadingActions from '../actions/LoadingActions';
import ActionStatus from '../../utils/ActionStatus';

const initialState = {
  activeLoadings: {},
  loading: false,
  actionLoading: false,
  status: ActionStatus.idle,
  actionError: null,
};

export default createReducer(initialState, builder =>
    builder
        .addCase(LoadingActions.start, (state, action) => {
            const {key, opacity} = action.payload;
            return {
                ...state,
                actives: {...state.activeLoadings, [key]: action},
                loading: true,
                opacity,
            };
        })
        .addCase(LoadingActions.stop, (state, action) => {
            delete state.activeLoadings[action.payload.key];

            state.loading = !!Object.keys(state.activeLoadings).length;
        })
        .addCase(LoadingActions.clear, () => ({}))
        .addCase(LoadingActions.idle, (state) => {
          return {
            ...state,
            actionLoading: false,
            status: ActionStatus.idle,
          };
        })
        .addCase(LoadingActions.pending, (state) => {
          return {
            ...state,
            actionLoading: true,
            status: ActionStatus.pendging,
            actionError: null
          };
        })
        .addCase(LoadingActions.succeeded, (state) => {
          return {
            ...state,
            actionLoading: false,
            status: ActionStatus.succeeded,
            actionError: null
          };
        })
        .addCase(LoadingActions.failed, (state, action) => {
          return {
            ...state,
            actionLoading: false,
            status: ActionStatus.failed,
            actionError: action.payload
          };
        })
);
