import reducer from '../../../../business/store/reducers/AuthReducer';
import AuthActions from '../../../../business/store/actions/AuthActions';

describe('Auth Reducer', () => {
  const initialState = { user: null };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const userPayload = { name: 'John Doe', email: 'john@example.com' };
    const action = AuthActions.setUser(userPayload);
    
    const expectedState = {
      user: userPayload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should merge user data when setUser is called again', () => {
    const initialStateWithUser = { user: { name: 'John Doe' } };
    const userPayload = { email: 'john@example.com' };
    const action = AuthActions.setUser(userPayload);
    
    const expectedState = {
      user: { name: 'John Doe', email: 'john@example.com' },
    };

    expect(reducer(initialStateWithUser, action)).toEqual(expectedState);
  });
});
