import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Search = ({ onAddToWatched }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const showsPerPage = 10;
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        if (searchTerm) {
            const searchShows = async (query, page) => {
                try {
                    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=${page}`
                    );
                    setSearchResults(response.data.results);
                    setTotalPages(response.data.total_pages);
                } catch (error) {
                    console.error('Error searching shows:', error);
                    setSearchResults([]);
                    setTotalPages(1);
                }
            };
            searchShows(searchTerm, currentPage);
        } else {
            setSearchResults([]);
            setTotalPages(1);
        }
    }, [searchTerm, currentPage]);

    const handleSearch = (query) => {
        setSearchTerm(query);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Search for Shows
                </Typography>
                <SearchBar onSearch={handleSearch} />
                <div>
                  <Button variant="contained" onClick={() => setLanguage('en')}>English</Button>
                  <Button variant="contained" onClick={() => setLanguage('es')}>Spanish</Button>
                </div>
                <Grid2 container spacing={2} sx={{ mt: 2 }}>
                    {searchResults.map((show) => (
                        <Grid2 item xs={12} sm={6} md={4} key={show.id}>
                            <ShowCard show={show} onAddToWatched={() => onAddToWatched(show, language)} />
                        </Grid2>
                    ))}
                </Grid2>
                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </Paper>
        </Container>
    );
};

export default Search;