import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Watched from './pages/Watched';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function App() {
  const [watchedShows, setWatchedShows] = useState([]);

  useEffect(() => {
    const fetchWatchedShows = async () => {
      try {
        const response = await fetch('/api/watched');
        const data = await response.json();
        setWatchedShows(data);
      } catch (error) {
        console.error('Error fetching watched shows:', error);
        // Handle the error appropriately (e.g., display an error message)
      }
    };

    fetchWatchedShows();
  }, []);

  const addToWatched = async (show) => {
    try {
      const response = await fetch('/api/watched', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ show }),
      });

      if (response.ok) {
        // Refresh the watched shows list after a successful addition
        const updatedShowsResponse = await fetch('/api/watched');
        const updatedShowsData = await updatedShowsResponse.json();
        setWatchedShows(updatedShowsData);
      } else {
        console.error('Failed to add show:', response.status);
        // Handle the error
      }
    } catch (error) {
      console.error('Error adding show:', error);
      // Handle the error
    }
  };

  const removeFromWatched = async (showId) => {
    try {
      const response = await fetch('/api/watched', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ showId }),
      });

      if (response.ok) {
        // Refresh the watched shows list after a successful deletion
        const updatedShowsResponse = await fetch('/api/watched');
        const updatedShowsData = await updatedShowsResponse.json();
        setWatchedShows(updatedShowsData);
      } else {
        console.error('Failed to remove show:', response.status);
        // Handle the error
      }
    } catch (error) {
      console.error('Error removing show:', error);
      // Handle the error
    }
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TV Show Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/search">Search</Button>
          <Button color="inherit" component={Link} to="/watched">Watched</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search onAddToWatched={addToWatched} />} />
          <Route path="/watched" element={<Watched watchedShows={watchedShows} onRemoveFromWatched={removeFromWatched} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;