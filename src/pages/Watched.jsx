import React, { useState, useEffect } from 'react';
import WatchedList from '../components/WatchedList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Watched = ({ watchedShows, onRemoveFromWatched }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const showsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShows, setFilteredShows] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        if (searchTerm && searchActive) {
            const filtered = watchedShows.filter(show =>
                show.name.toUpperCase().includes(searchTerm.toUpperCase())
            );
            setFilteredShows(filtered);
            setCurrentPage(1);
        } else {
            setFilteredShows([...watchedShows]);
            setCurrentPage(1);
        }
        setSearchActive(false);
    }, [watchedShows, searchTerm, searchActive]);

    const totalShows = filteredShows.length;
    const totalPages = Math.ceil(totalShows / showsPerPage);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchActive(true);
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission and page refresh
            setSearchActive(true);
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Watched Shows
                </Typography>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        label="Search Watched Shows"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleEnterKey}
                        sx={{ mr: 1 }}
                    />
                    <Button variant="contained" type="submit">
                        Search
                    </Button>
                </Box>
                <WatchedList watchedShows={currentShows} onRemoveFromWatched={onRemoveFromWatched} />
                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        disabled={totalShows <= showsPerPage}
                    />
                </Stack>
            </Paper>
        </Container>
    );
};

export default Watched;