import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom component="h1">
          Welcome to Your TV Show Tracker!
        </Typography>
        <Typography variant="body1" paragraph>
          <Link to="/search" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Search for shows</Button>
          </Link> to add to your watched list.
        </Typography>
        <Typography variant="body1" paragraph>
          Go to your <Link to="/watched" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary">Watched list</Button>
          </Link> to see what you've already watched.
        </Typography>
        <Typography variant="body1" paragraph>
          Go to your <Link to="/spanish" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary">Spanish list</Button>
          </Link> to see what you've already watched.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;