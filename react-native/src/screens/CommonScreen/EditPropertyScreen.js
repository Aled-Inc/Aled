import { Text, View } from "native-base";
import SettingsSectionLayout from "../Settings/SettingsSectionLayout";
import SettingButtonRow from "../Settings/SettingsButtonRow";
import { useFormik } from "formik";
import { object } from "yup";
import { StyleSheet } from "react-native";
import { Colors } from "../../styles/CommonStyle";
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import PropTypes from 'prop-types';
import { connectToRedux } from "../../utils/ReduxConnect";
import { createActionErrorSelector, createActionLoadingSelector, createActionStatusSelector } from '../../store/selectors/LoadingSelectors';
import ActionStatus from "../../utils/ActionStatus";
import { useEffect } from "react";
import PropRoles from "../../utils/PropRoles";
import { commonValidator, emailValidator, nullableValidator, passwordValidator, phoneValidator, requiredValidator } from "../../utils/Validators";
import i18n from "i18n-js";

function EditPropertyScreen({ route, navigation,  actionLoading, actionStatus, actionError }) {
  const { propName, propValue, propRole, submit } = route.params;

  const isPasswordRole = propRole === PropRoles.password;
  
  const ValidationSchema = object().shape({
    value: isPasswordRole ? passwordValidator() : propRole === PropRoles.email ? emailValidator() : propRole === PropRoles.phone ? phoneValidator() : commonValidator(),
    extraValue: isPasswordRole ? requiredValidator() : nullableValidator(),
  });

  const isValueValid = () => formik.values.value != null && formik.values.value !== propValue;
  const isExtraValueValid = () => isPasswordRole ? formik.values.extraValue != null : true;

  useEffect(() => {
    if (actionStatus === ActionStatus.succeeded) {
      navigation.goBack();
    }
  }, [actionStatus]);

  const onSave = ({ value, extraValue }) => {
    isPasswordRole ? submit({ value, extraValue }) : submit({ value });
  }

  const formik = useFormik({
    validationSchema: ValidationSchema,
    initialValues: { value: propValue, extraValue: null },
    onSubmit: onSave
  });

  const clearField = (valueName) => {
    formik.setFieldValue(valueName, '');
  }

  const isValid = () => {
    return formik.isValid && isValueValid() && isExtraValueValid();
  }

  const hasError = () => {
    return (
      formik.errors.value == null ?
       <Text style={saveButton.rule}>Règles de validation.</Text> :
       <ValidationMessage value={formik.errors.value?.value}>{formik.errors.value.text}</ValidationMessage> 
    );
  }

  const extraHasError = () => {
    return (
      formik.errors.extraValue != null ?
      <ValidationMessage value={formik.errors.extraValue.value}>{formik.errors.extraValue.text}</ValidationMessage> :
      null
    );
  }

  const canSave = () => {
    return (
      <SettingsSectionLayout isCategory={false} bgColor={Colors.Element}>
        <SettingButtonRow.Button 
          label={i18n.t('AbpUi::Save')}
          isTextCentered={true}
          loading={actionLoading}
          style={saveButton.save}
          onPress={formik.handleSubmit}>
        </SettingButtonRow.Button>
      </SettingsSectionLayout>
    );
  }

  return (
    <View p={5} flex={1} backgroundColor={Colors.BG}>
      {
        isPasswordRole ? (
          <>
            <SettingsSectionLayout title={i18n.t('AbpIdentity::DisplayName:CurrentPassword')} isCategory={false} marginBottom={0}>
              <SettingButtonRow.Edit 
                role={propRole}
                propValue={formik.values.extraValue} 
                onChange={formik.handleChange('extraValue')}
                onDelete={() => clearField('extraValue')}>
              </SettingButtonRow.Edit>
            </SettingsSectionLayout>
            {extraHasError()}
          </>
        )
        : null
      }

      <SettingsSectionLayout title={propName} isCategory={false} marginBottom={0}>
        <SettingButtonRow.Edit 
          role={propRole}
          placeholder={propName}
          propValue={formik.values.value} 
          onChange={formik.handleChange('value')}
          onDelete={() => clearField('value')}>
        </SettingButtonRow.Edit>
      </SettingsSectionLayout>

      { hasError() }
      
      { isValid() ? canSave() : <></>}
    </View>
  );
}

const saveButton = StyleSheet.create({
  save: {
    fontFamily: 'Inter-SemiBold',
    lineHeight: 32,
    fontSize: 15,
    color: Colors.White,
  },
  rule: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: Colors.SubText,
  },
});

EditPropertyScreen.propTypes = {
  actionLoading: PropTypes.bool.isRequired,
  actionStatus: PropTypes.string.isRequired,
  actionError: PropTypes.string.isRequired,
}

export default connectToRedux({
  component: EditPropertyScreen,
  stateProps: state => ({
    actionLoading: createActionLoadingSelector()(state),
    actionStatus: createActionStatusSelector()(state),
    actionError: createActionErrorSelector()(state),
  }),
});