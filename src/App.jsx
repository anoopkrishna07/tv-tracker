import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Watched from './pages/Watched';
import SpanishWatched from './pages/SpanishWatched';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
    const [watchedShows, setWatchedShows] = useState([]);
    const [spanishWatchedShows, setSpanishWatchedShows] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'info' | 'warning' | 'error'

    useEffect(() => {
        const fetchWatchedShows = async () => {
            try {
                const response = await fetch('/api/watched');
                const data = await response.json();
                setWatchedShows(data);
            } catch (error) {
                console.error('Error fetching watched shows:', error);
            }
        };

        const fetchSpanishWatchedShows = async () => {
            try {
                const response = await fetch('/api/watched?language=es');
                const data = await response.json();
                setSpanishWatchedShows(data);
            } catch (error) {
                console.error('Error fetching Spanish watched shows:', error);
            }
        };

        fetchWatchedShows();
        fetchSpanishWatchedShows();
    }, []);

    const handleAuthOpen = () => {
        setAuthDialogOpen(true);
    };

    const handleAuthClose = () => {
        setAuthDialogOpen(false);
    };

    const handleAuthSubmit = () => {
        // Basic validation: Make sure username and password are not empty
        if (!username || !password) {
            alert("Please enter both a username and password.");
            return;
        }
        setIsAuthenticated(true);
        setAuthDialogOpen(false);
    };

    const getAuthHeader = () => {
        if (isAuthenticated && username && password) {
            const encodedCredentials = btoa(`${username}:${password}`);
            return `Basic ${encodedCredentials}`;
        }
        return null;
    };

    const showSnackbar = (message, severity = 'success') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const addToWatched = async (show, language = 'en') => {
        const authHeader = getAuthHeader();

        if (!authHeader) {
            handleAuthOpen();
            return;
        }

        try {
            const response = await fetch('/api/watched', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
                body: JSON.stringify({ show: show, language: language }),
            });

            if (response.ok) {
                const updatedShowsResponse = await fetch('/api/watched', { headers: { 'Authorization': authHeader } });
                const updatedShowsData = await updatedShowsResponse.json();
                const updatedSpanishShowsResponse = await fetch('/api/watched?language=es', { headers: { 'Authorization': authHeader } });
                const updatedSpanishShowsData = await updatedSpanishShowsResponse.json();
                setWatchedShows(updatedShowsData);
                setSpanishWatchedShows(updatedSpanishShowsData);
                showSnackbar('Show added!', 'success');
            } else if (response.status === 401) {
                alert('Authentication failed. Please try again.');
                setIsAuthenticated(false);
                handleAuthOpen();
            } else {
                console.error('Failed to add show:', response.status);
                showSnackbar('Failed to add show', 'error');
            }
        } catch (error) {
            console.error('Error adding show:', error);
            showSnackbar('Error adding show', 'error');
        }
    };

    const removeFromWatched = async (showId) => {
        const authHeader = getAuthHeader();

        if (!authHeader) {
            handleAuthOpen();
            return;
        }

        try {
            const response = await fetch('/api/watched', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
                body: JSON.stringify({ showId }),
            });

            if (response.ok) {
                const updatedShowsResponse = await fetch('/api/watched', { headers: { 'Authorization': authHeader } });
                const updatedSpanishShowsResponse = await fetch('/api/watched?language=es', { headers: { 'Authorization': authHeader } });
                const updatedShowsData = await updatedShowsResponse.json();
                const updatedSpanishShowsData = await updatedSpanishShowsResponse.json();
                setWatchedShows(updatedShowsData);
                setSpanishWatchedShows(updatedSpanishShowsData);
                showSnackbar('Show removed!', 'success');
            } else if (response.status === 401) {
                alert('Authentication failed. Please try again.');
                setIsAuthenticated(false);
                handleAuthOpen();
            } else {
                console.error('Failed to remove show:', response.status);
                showSnackbar('Failed to remove show', 'error');
            }
        } catch (error) {
            console.error('Error removing show:', error);
            showSnackbar('Error removing show', 'error');
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
                    <Button color="inherit" component={Link} to="/spanish">Spanish</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search onAddToWatched={addToWatched} />} />
                    <Route path="/watched" element={<Watched watchedShows={watchedShows} onRemoveFromWatched={removeFromWatched} />} />
                    <Route path="/spanish" element={<SpanishWatched watchedShows={spanishWatchedShows} onRemoveFromWatched={removeFromWatched} />} />
                </Routes>
            </Box>

            <Dialog open={authDialogOpen} onClose={handleAuthClose}>
                <DialogTitle>Authentication Required</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password to make changes.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAuthClose}>Cancel</Button>
                    <Button onClick={handleAuthSubmit}>Authenticate</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Router>
    );
}

export default App;