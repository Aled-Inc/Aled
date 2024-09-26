import reducer from '../../../../business/store/reducers/LoadingReducer';
import LoadingActions from '../../../../business/store/actions/LoadingActions';
import ActionStatus from '../../../../common/utils/ActionStatus';

describe('Loading Reducer', () => {
  const initialState = {
    activeLoadings: {},
    loading: false,
    actionLoading: false,
    status: ActionStatus.idle,
    actionError: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle start loading', () => {
    const action = LoadingActions.start({ key: 'fetchData', opacity: 0.5 });
    const expectedState = {
      ...initialState,
      activeLoadings: {},
      actives: { fetchData: action },
      loading: true,
      opacity: 0.5,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle stop loading', () => {
    const action = LoadingActions.stop({ key: 'fetchData' });
    const initialStateWithLoading = {
      ...initialState,
      activeLoadings: { fetchData: action },
      loading: true,
    };
    
    const expectedState = {
      ...initialState,
      activeLoadings: {},
      loading: false,
    };

    expect(reducer(initialStateWithLoading, action)).toEqual(expectedState);
  });

  it('should handle clear loading', () => {
    const action = LoadingActions.clear();
    const expectedState = {};

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle idle action', () => {
    const action = LoadingActions.idle();
    const initialStateWithActionLoading = {
      ...initialState,
      actionLoading: true,
      status: ActionStatus.pending,
    };

    const expectedState = {
      ...initialStateWithActionLoading,
      actionLoading: false,
      status: ActionStatus.idle,
    };

    expect(reducer(initialStateWithActionLoading, action)).toEqual(expectedState);
  });

  it('should handle pending action', () => {
    const action = LoadingActions.pending();
    const expectedState = {
      ...initialState,
      actionLoading: true,
      status: ActionStatus.pending,
      actionError: null,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle succeeded action', () => {
    const action = LoadingActions.succeeded();
    const initialStateWithActionLoading = {
      ...initialState,
      actionLoading: true,
      status: ActionStatus.pending,
    };

    const expectedState = {
      ...initialStateWithActionLoading,
      actionLoading: false,
      status: ActionStatus.succeeded,
      actionError: null,
    };

    expect(reducer(initialStateWithActionLoading, action)).toEqual(expectedState);
  });

  it('should handle failed action', () => {
    const error = 'An error occurred';
    const action = LoadingActions.failed(error);
    const expectedState = {
      ...initialState,
      actionLoading: false,
      status: ActionStatus.failed,
      actionError: error,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
