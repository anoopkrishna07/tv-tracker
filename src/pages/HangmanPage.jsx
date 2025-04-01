import React from 'react';
import HangmanGame from '../components/HangmanGame';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const HangmanPage = ({ watchedShows }) => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Hangman Game
                </Typography>
                <HangmanGame watchedShows={watchedShows} />
            </Paper>
        </Container>
    );
};

export default HangmanPage;