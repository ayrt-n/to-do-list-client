import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { login } from '../services/authService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function Login() {
  // Get state from useLocation if passed (set to null if no state is passed)
  const { state } = useLocation();
  // Set flash using state from useLocation hook
  const [flash, setFlash] = useState(state);
  const routerNavigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const handleLogin = (values, { setSubmitting }) => {
    login(values.email, values.password)
    .then((data) => {
      if (!data.error) {
        // If successful login (no error) redirect to app
        routerNavigate('/app');
        window.location.reload();
      } else {
        // If error logging in, set flash state to render errors
        setFlash({
          type: 'danger',
          message: 'Login failed:',
          details: data.error.details
        })
      }
      setSubmitting(false);
    })
  };

  return (
    <div className="Form-container">
      {flash ? <Alert {...flash} /> : null}
      <h1 className="Form-header">Log in</h1>
      <Formik
        initialValues={{email: '', password: ''}}
        validate={validate}
        onSubmit={handleLogin}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <TextInput label="Password" name="password" id="password" type="password" />
            <Button label="Sign in" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div className="Form-links">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p>
          <Link to="/forgot_password">Forgot your password?</Link>
        </p>
        <p>
          <Link to="/confirmations">Didn't receive confirmation instructions?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
