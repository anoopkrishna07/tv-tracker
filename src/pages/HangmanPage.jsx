import React, { useState, useEffect } from 'react';
import HangmanGame from '../components/HangmanGame';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const HangmanPage = ({ watchedShows }) => {
    const [selectedShow, setSelectedShow] = useState(null);

    const handleStartGame = () => {
        if (watchedShows && watchedShows.length > 0) {
            const randomIndex = Math.floor(Math.random() * watchedShows.length);
            setSelectedShow(watchedShows[randomIndex]);
        }
    };

     const handleRestart = () => {
        if (watchedShows && watchedShows.length > 0) {
            const randomIndex = Math.floor(Math.random() * watchedShows.length);
            setSelectedShow(watchedShows[randomIndex]);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Hangman Game
                </Typography>
                {!selectedShow ? (
                    <Button variant="contained" onClick={handleStartGame}>
                        Start Game
                    </Button>
                ) : (
                    <HangmanGame selectedShow={selectedShow}  onRestart={handleRestart} />
                )}
            </Paper>
        </Container>
    );
};

export default HangmanPage;