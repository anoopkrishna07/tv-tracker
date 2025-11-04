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
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const showsPerPage = 10; // Number of shows to display per page

    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [filteredShows, setFilteredShows] = useState([...watchedShows]); // Initialize filteredShows with all shows
    

    //Update showItems
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        // Perform filtering in this scope
        let filtered = [...watchedShows];
        if (searchTerm) {
          filtered = watchedShows.filter(show =>
              show.name.toUpperCase().includes(searchTerm.toUpperCase())
          );
        }
        setFilteredShows(filtered);
        setCurrentPage(1);
    };

    const totalShows = filteredShows.length;
    const totalPages = Math.ceil(totalShows / showsPerPage);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
    console.log('currentShows:', currentShows); // Log the currentShows array

    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update the current page when the user clicks on a different page
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term as the user types
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission and page refresh
            handleSearchSubmit(event); //trigger same code in handleSearchSubmit instead
        }
    };

    useEffect(() => {
        // setFilteredShows([...watchedShows])
    }, [watchedShows]);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Watched Shows
                </Typography>
                {/* Search input and button */}
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

                {/* Watched list component displaying the current shows */}
                <WatchedList watchedShows={currentShows} onRemoveFromWatched={onRemoveFromWatched} />

                {/* Pagination component */}
                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        disabled={totalShows <= showsPerPage} //Disable if it's less than the page requirements.
                    />
                </Stack>
            </Paper>
        </Container>
    );
};

export default Watched;