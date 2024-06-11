import React from 'react';
import { Typography, Container } from '@mui/material';

function MainPage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Main Page!
      </Typography>
    </Container>
  );
}

export default MainPage;
