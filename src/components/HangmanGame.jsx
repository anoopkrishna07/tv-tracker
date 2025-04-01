import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

const HangmanGame = ({ watchedShows }) => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [message, setMessage] = useState('');
    const [userGuess, setUserGuess] = useState('');

    useEffect(() => {
        if (watchedShows && watchedShows.length > 0) {
            const randomIndex = Math.floor(Math.random() * watchedShows.length);
            const selectedWord = watchedShows[randomIndex].name.toUpperCase();
            setWord(selectedWord);
            setGuessedLetters(Array(selectedWord.length).fill('_'));
        }
    }, [watchedShows]);

    useEffect(() => {
        // Check if the player won
        if (guessedLetters.join('') === word) {
            setGameStatus('won');
            setMessage('You won!');
        }
    }, [guessedLetters, word]);

    const handleGuess = () => {
        if (!userGuess) return; // Prevent empty guesses
        const guess = userGuess.toUpperCase();
        setUserGuess('');

        if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
            setMessage('Please enter a single letter (A-Z).');
            return;
        }

        if (word.includes(guess)) {
            const newGuessedLetters = word.split('').map((letter, index) => {
                return letter === guess ? letter : guessedLetters[index];
            });
            setGuessedLetters(newGuessedLetters);
            setMessage(''); // Clear message on correct guess
        } else {
            setLives(lives - 1);
            setMessage(`Incorrect guess! Lives remaining: ${lives - 1}`);
            if (lives <= 1) {
                setGameStatus('lost');
                setMessage(`You lost! The word was: ${word}`);
            }
        }
    };

    const handleRestart = () => {
        if (watchedShows && watchedShows.length > 0) {
            const randomIndex = Math.floor(Math.random() * watchedShows.length);
            const selectedWord = watchedShows[randomIndex].name.toUpperCase();
            setWord(selectedWord);
            setGuessedLetters(Array(selectedWord.length).fill('_'));
            setLives(3);
            setGameStatus('playing');
            setMessage('');
        }
    };

    const displayWord = guessedLetters.map((letter, index) => (
        <Typography key={index} variant="h4" component="span" sx={{ mr: 1 }}>
            {letter}
        </Typography>
    ));

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Hangman Game
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Guess the TV Show Title!
                </Typography>
                {gameStatus === 'playing' && (
                    <>
                        <Box sx={{ mb: 2 }}>
                            {displayWord}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography>Lives: {lives}</Typography>
                            <Typography color="error">{message}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="Guess a letter"
                                variant="outlined"
                                size="small"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                            />
                            <Button variant="contained" onClick={handleGuess} sx={{ ml: 1 }}>
                                Guess
                            </Button>
                        </Box>
                    </>
                )}
                {gameStatus !== 'playing' && (
                    <Box>
                        <Typography variant="h6" color={gameStatus === 'won' ? 'success.main' : 'error.main'}>
                            {message}
                        </Typography>
                        <Button variant="contained" onClick={handleRestart}>
                            Restart
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default HangmanGame;