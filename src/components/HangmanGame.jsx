import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia

const HangmanGame = ({ selectedShow }) => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [message, setMessage] = useState('');
    const [userGuess, setUserGuess] = useState('');
    const inputRef = useRef(null);

    const theme = useTheme(); // Get the theme object
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile screen (sm breakpoint or lower)

    useEffect(() => {
        if (selectedShow) {
            setWord(selectedShow.name.toUpperCase());
            setGuessedLetters(Array(selectedShow.name.length).fill('_'));
            setLives(3)
        }
    }, [selectedShow]);

    useEffect(() => {
        // Check if the player won
        if (guessedLetters.join('') === word && word != "") {
            setGameStatus('won');
            setMessage(`You won! The show was: ${selectedShow.name}`);
        }
    }, [guessedLetters, word, selectedShow]);

    const handleGuess = () => {
        if (!userGuess) return; // Prevent empty guesses
        const guess = userGuess.toUpperCase();
        setUserGuess('');

        if (guess.length !== 1 && guess !== ' ') { //Modify this section
            setMessage('Please enter a single letter (A-Z) or a space.'); //Modify the displayed section
            return;
        }

        if (word.includes(guess)) {
            const newGuessedLetters = word.split('').map((letter, index) => {
                return letter === guess ? letter : guessedLetters[index];
            });
            setGuessedLetters(newGuessedLetters);
            setMessage('');
        } else {
            if (guess !== ' ') {  //This way we do not deduct lives if a user gusses an empty space.
                setLives(lives - 1);
                setMessage(`Incorrect guess! Lives remaining: ${lives - 1}`);
                if (lives <= 0) {
                    setGameStatus('lost');
                    setMessage(`You lost! The show was: ${selectedShow.name}`);
                }
            }
        }
    };

    const handleRestart = () => {
            setLives(3)
            setGameStatus('playing')
        };

    const displayWord = guessedLetters.map((letter, index) => (
        <Typography key={index} variant={isMobile ? 'h5' : 'h4'} component="span" sx={{ mr: 1, fontSize: isMobile ? '1.2rem' : 'inherit' }}> {/* Scale down h4 if it's mobile */}
            {letter === '_' ? '_' : letter === ' ' ? '\u00A0\u00A0' : letter}
        </Typography>
    ));

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keypress', handleKeyPress);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, [handleKeyPress]);


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Hangman Game
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Guess the TV Show Title!
                </Typography>
                {selectedShow && gameStatus === 'playing' && (
                    <>
                        <Box sx={{ mb: 2, overflowX: 'auto' }}> {/* Make it scrollable on small screens */}
                            {displayWord}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography>Lives: {lives}</Typography>
                            <Typography color="error">{message}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}> {/* Column layout for mobile */}
                            <TextField
                                inputRef={inputRef}
                                label="Guess a letter"
                                variant="outlined"
                                size="small"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                                sx={{ mb: isMobile ? 1 : 0 }} /* Add margin bottom on mobile */
                            />
                            <Button variant="contained" onClick={handleGuess} sx={{ ml: isMobile ? 0 : 1 }}> {/*Remove margin in mobile*/}
                                Guess
                            </Button>
                        </Box>
                    </>
                )}
                {gameStatus !== 'playing' && selectedShow && (
                    <Box sx={{ textAlign: 'center' }}> {/* Center content */}
                        {gameStatus === 'won' && selectedShow.poster_path && ( /* Conditionally render image */
                            <CardMedia
                                component="img"
                                image={`https://image.tmdb.org/t/p/w342${selectedShow.poster_path}`}
                                alt={selectedShow.name}
                                sx={{
                                    maxWidth: '200px',
                                    margin: '0 auto 16px',
                                }}
                            />
                        )}
                        <Typography variant="h6" color={gameStatus === 'won' ? 'success.main' : 'error.main'}>
                            {message}
                        </Typography>
                        <Button variant="contained" onClick={() => {
                           handleRestart()
                         }}>
                            Restart
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default HangmanGame;