import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditPropertyScreen from '../../../presentation/screens/CommonScreen/EditPropertyScreen';
import { NativeBaseProvider } from 'native-base';
import ActionStatus from '../../../common/utils/ActionStatus';
import { useFormik } from 'formik';
import PropRoles from '../../../common/utils/PropRoles';

const mockStore = configureStore([]);

const navigateMock = jest.fn();
const submitMock = jest.fn();

jest.mock('i18n-js', () => ({
  t: jest.fn((key) => key),
}));

jest.mock('formik', () => ({
  useFormik: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

const setup = (store, routeParams) => {
  return render(
    <NativeBaseProvider>
      <Provider store={store}>
        <EditPropertyScreen
          route={{ params: routeParams }}
          navigation={{ goBack: navigateMock }}
          actionLoading={false}
          actionStatus={ActionStatus.idle}
        />
      </Provider>
    </NativeBaseProvider>
  );
};

describe('EditPropertyScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      loading: {
        actionLoading: false,
        actionStatus: ActionStatus.idle,
      }
    });

    useFormik.mockReturnValue({
      handleChange: jest.fn(),
      handleSubmit: submitMock,
      values: { password: '', currentPassword: '' },
      errors: {},
      isValid: true,
      setFieldValue: jest.fn(),
    });
    submitMock.mockReset();
    navigateMock.mockReset();
  });

  it('should render correctly for email', async() => {
    const routeParams = {
      propName: 'Email',
      propValue: 'test@example.com',
      propRole: PropRoles.email,
      submit: submitMock,
    };
    
    const { getByPlaceholderText, getByText } = setup(store, routeParams);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
  });

  it('should call submit with valid values for email', async () => {
    const routeParams = {
      propName: 'Email',
      propValue: 'test@example.com',
      propRole: PropRoles.email,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: submitMock,
      values: { value: 'new@example.com' },
      errors: {},
      isValid: true,
      setFieldValue: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = setup(store, routeParams);

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), 'new@example.com');

      await waitFor(() => {
        fireEvent.press(getByText('AbpUi::Save'));
      });
    });

    expect(submitMock).toHaveBeenCalled();
  });

  it('should call submit with valid values for password', async () => {
    const routeParams = {
      propName: 'Password',
      propValue: '',
      propRole: PropRoles.password,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: submitMock,
      values: { value: 'Azerty123*', extraValue: 'Qwerty123*'},
      errors: {},
      isValid: true,
      setFieldValue: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = setup(store, routeParams);

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(''), 'Azerty123*');
      fireEvent.changeText(getByPlaceholderText('Password'), 'Qwerty123*');

      await waitFor(() => {
        fireEvent.press(getByText('AbpUi::Save'));
      });
    });

    expect(submitMock).toHaveBeenCalled();
  });

  it('should show validation error for email', async () => {
    const routeParams = {
      propName: 'Email',
      propValue: 'test@example.com',
      propRole: PropRoles.email,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: '', extraValue: null },
      errors: { value: { text: 'Invalid email' } },
      isValid: false,
      setFieldValue: jest.fn(),
    });

    const { getByText } = setup(store, routeParams);

    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('should show validation error for password', async () => {
    const routeParams = {
      propName: 'Password',
      propValue: '',
      propRole: PropRoles.password,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: 'short', extraValue: '123' },
      errors: {
        value: { text: 'Password must be at least 8 characters.' },
        extraValue: { text: 'Current password is required.' },
      },
      isValid: false,
      setFieldValue: jest.fn(),
    });

    const { getByText } = setup(store, routeParams);

    expect(getByText('Password must be at least 8 characters.')).toBeTruthy();
    expect(getByText('Current password is required.')).toBeTruthy();
  });

  it('should not show the save button when values are invalid for email', async () => {
    const routeParams = {
      propName: 'Email',
      propValue: 'test@example.com',
      propRole: PropRoles.email,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: '' },
      errors: { value: { text: 'Invalid email' } },
      isValid: false,
      setFieldValue: jest.fn(),
    });

    const { queryByText } = setup(store, routeParams);
    const saveButton = queryByText('AbpUi::Save');

    expect(saveButton).toBeNull();
  });

  it('should show the save button when values are valid for email', async () => {
    const routeParams = {
      propName: 'Email',
      propValue: 'test@example.com',
      propRole: PropRoles.email,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: 'new@example.com' },
      errors: {},
      isValid: true,
      setFieldValue: jest.fn(),
    });

    const { getByText } = setup(store, routeParams);
    const saveButton = getByText('AbpUi::Save');

    expect(saveButton).toBeTruthy();
  });

  it('should not show the save button when values are invalid for password', async () => {
    const routeParams = {
      propName: 'Password',
      propValue: '',
      propRole: PropRoles.password,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: 'short', extraValue: '' },
      errors: {
        value: { text: 'Password must be at least 8 characters.' },
        extraValue: { text: 'Current password is required.' },
      },
      isValid: false,
      setFieldValue: jest.fn(),
    });

    const { queryByText } = setup(store, routeParams);
    const saveButton = queryByText('AbpUi::Save');

    expect(saveButton).toBeNull();
  });

  it('should show the save button when values are valid for password', async () => {
    const routeParams = {
      propName: 'Password',
      propValue: '',
      propRole: PropRoles.password,
      submit: submitMock,
    };

    useFormik.mockReturnValueOnce({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      values: { value: 'ValidPassword1!', extraValue: 'CurrentPassword123!' },
      errors: {},
      isValid: true,
      setFieldValue: jest.fn(),
    });

    const { getByText } = setup(store, routeParams);
    const saveButton = getByText('AbpUi::Save');

    expect(saveButton).toBeTruthy();
  });
});
