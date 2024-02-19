import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userSlice';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { baseURL } from '../resources/URLs.js';
import { useFetch } from '../customHooks/useFetch';

const initialLoginForm = {
  email: '',
  password: '',
};
const initialSignUpForm = {
  ...initialLoginForm,
  confirmPassword: '',
};

const initialValidationError = {
  email: false,
  password: false,
  confirmPassword: false,
};

const LoginOrSignupForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    isLogin ? initialLoginForm : initialSignUpForm
  );
  const [validationError, setValidationError] = useState(
    initialValidationError
  );
  const dispatch = useDispatch();
  const { fetchData: submitForm } = useFetch();

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validateFormByFieldName = (event) => {
    // todo: improve form validation
    setValidationError({
      ...validationError,
      [event.target.name]: !form[event.target.name],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.confirmPassword)) {
      setValidationError({
        email: !form.email,
        password: !form.password,
        confirmPassword: isLogin ? false : !form.confirmPassword,
      });
      return;
    }

    const url = isLogin
      ? `${baseURL}/api/auth/login`
      : `${baseURL}/api/auth/sign-up`;

    submitForm({
      url,
      options: {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      dataHandler: (data) => {
        dispatch(
          login({
            token: data.token,
            _id: data.userId,
            username: data.username,
            cakeDay: data.cakeDay,
          })
        );
        navigate('/');
      },
    });
  };
  return (
    <Paper>
      <form>
        <FormControl sx={{ padding: '20px', gap: '10px', width: '600px' }}>
          <TextField
            type='email'
            error={validationError.email}
            onBlur={validateFormByFieldName}
            name='email'
            label='Email'
            variant='outlined'
            value={form.email}
            onChange={handleFormChange}
            autoComplete='email'
            helperText={validationError.email ? 'Required' : ''}
          />
          <TextField
            type='password'
            error={validationError.password}
            onBlur={validateFormByFieldName}
            name='password'
            label='Password'
            variant='outlined'
            value={form.password}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            onChange={handleFormChange}
            helperText={validationError.password ? 'Required' : ''}
          />
          <TextField
            sx={{ display: isLogin ? 'none' : 'inherit' }}
            type='password'
            error={validationError.confirmPassword}
            onBlur={validateFormByFieldName}
            name='confirmPassword'
            label='Confirm Password'
            variant='outlined'
            value={form.confirmPassword}
            autoComplete='new-password'
            onChange={handleFormChange}
            helperText={validationError.confirmPassword ? 'Required' : ''}
          />
          <Button variant='contained' type='submit' onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Stack direction='row' justifyContent='center'>
            <Typography>
              {isLogin ? 'New to Readdit?' : 'Already have an account?'}
            </Typography>
            <Link to={isLogin ? '/sign-up' : '/login'}>
              <Typography sx={{ ml: '5px' }}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Typography>
            </Link>
          </Stack>
        </FormControl>
      </form>
    </Paper>
  );
};

export default LoginOrSignupForm;
