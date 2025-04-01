import React, { useState } from 'react';
import HangmanGame from '../components/HangmanGame';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const HangmanPage = ({ watchedShows }) => {
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Hangman Game
                </Typography>
                {!gameStarted ? (
                    <Button variant="contained" onClick={handleStartGame}>
                        Start Game
                    </Button>
                ) : (
                    <HangmanGame watchedShows={watchedShows} />
                )}
            </Paper>
        </Container>
    );
};

export default HangmanPage;