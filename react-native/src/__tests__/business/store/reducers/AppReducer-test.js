import reducer from '../../../../business/store/reducers/AppReducer';
import AppActions from '../../../../business/store/actions/AppActions';

describe('App Reducer', () => {
  const initialState = {
    appConfig: {},
    modalType: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setAppConfig', () => {
    const newConfig = { theme: 'dark', language: 'fr' };
    const action = AppActions.setAppConfig(newConfig);
    
    const expectedState = {
      ...initialState,
      appConfig: newConfig,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle requestConfirmationModal', () => {
    const modalType = 'DELETE_CONFIRMATION';
    const action = AppActions.requestConfirmationModal({ modalType });
    
    const expectedState = {
      ...initialState,
      modalType: modalType,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
