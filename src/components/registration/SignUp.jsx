import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().matches(/^[0-9]+$/, "Phone number must be numeric").required('Phone number is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/signup', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="First Name" fullWidth margin="normal" error={!!errors.firstName} helperText={errors.firstName?.message} />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Last Name" fullWidth margin="normal" error={!!errors.lastName} helperText={errors.lastName?.message} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Phone Number" fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default SignUp;
