import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/signin', data);
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
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
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
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default SignIn;
