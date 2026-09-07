import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useGetSettingsQuery, usePostSettingsMutation } from '../../api/api';
import type { SettingsInput } from '../../api/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SettingsFormValues {
  siteName: string;
  supportEmail: string;
  maxTicketsPerOrder: number | '';
}

const settingsSchema = yup.object({
  siteName: yup.string().trim().required('Site name is required'),
  supportEmail: yup
    .string()
    .trim()
    .required('Support email is required')
    .matches(EMAIL_REGEX, 'Invalid email'),
  maxTicketsPerOrder: yup
    .number()
    .required('Required')
    .integer()
    .positive()
    .max(Number.MAX_SAFE_INTEGER),
});

const SettingsForm = () => {
  const { data, isLoading, error } = useGetSettingsQuery();
  const [postSettings, { isLoading: isSaving, isError: isSaveError }] = usePostSettingsMutation();
  const [saved, setSaved] = useState(false);

  if (isLoading) return <CircularProgress />;

  const isNotFound = Boolean(error && 'status' in error && error.status === 404);
  if (error && !isNotFound) return <Alert severity="error">Failed to load settings</Alert>;

  const initialValues: SettingsFormValues = data ?? {
    siteName: '',
    supportEmail: '',
    maxTicketsPerOrder: '',
  };

  const handleSubmit = async (values: SettingsFormValues) => {
    const payload: SettingsInput = { ...values, maxTicketsPerOrder: Number(values.maxTicketsPerOrder) };
    try {
      await postSettings(payload).unwrap();
      setSaved(true);
    } catch {
      // isSaveError below already reflects the failure to the user
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={settingsSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 480 }}>
              <TextField
                name="siteName"
                label="Site name"
                value={values.siteName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.siteName && Boolean(errors.siteName)}
                helperText={touched.siteName && errors.siteName}
              />
              <TextField
                name="supportEmail"
                label="Support email"
                value={values.supportEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.supportEmail && Boolean(errors.supportEmail)}
                helperText={touched.supportEmail && errors.supportEmail}
              />
              <TextField
                name="maxTicketsPerOrder"
                label="Max tickets per order"
                type="number"
                value={values.maxTicketsPerOrder}
                onChange={(e) =>
                  setFieldValue('maxTicketsPerOrder', e.target.value === '' ? '' : Number(e.target.value))
                }
                onBlur={handleBlur}
                error={touched.maxTicketsPerOrder && Boolean(errors.maxTicketsPerOrder)}
                helperText={touched.maxTicketsPerOrder && errors.maxTicketsPerOrder}
              />
              {isSaveError && <Alert severity="error">Failed to save settings</Alert>}
              <Button type="submit" variant="contained" disabled={isSaving}>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)} message="Settings saved" />
    </>
  );
};

export default SettingsForm;
