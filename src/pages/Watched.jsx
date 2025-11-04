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
    const [filteredShows, setFilteredShows] = useState([]); // Filtered shows based on search term
    const [searchActive, setSearchActive] = useState(false);

    // This useEffect hook runs whenever watchedShows, searchTerm, or searchActive changes
    useEffect(() => {
        console.log('useEffect triggered'); // Log when useEffect is triggered

        // Filter the shows based on the search term and whether a search is active

        let filtered = [...watchedShows]; // Start with all shows

        if (searchTerm && searchActive) { //If a search operation has started
            console.log('Applying filter:', searchTerm); // Log the search term
            filtered = watchedShows.filter(show =>  // Apply the filter
                show.name.toUpperCase().includes(searchTerm.toUpperCase()) // Check if show name includes search term (case-insensitive)
            );
            setCurrentPage(1); // Reset to page 1 when a new search is performed
        } else {
            console.log('No filter applied'); // Log when no filter is applied
            setCurrentPage(1);
        }

        setFilteredShows(filtered); // Update the filteredShows state with the filtered results
        console.log('filteredShows:', filtered); // Log the filteredShows array
        setSearchActive(false); // Reset the searchActive state after filtering
    }, [watchedShows, searchTerm, searchActive]);

    // Calculate the total number of shows after filtering
    const totalShows = filteredShows.length;
    const totalPages = Math.ceil(totalShows / showsPerPage);

    // Calculate the index of the first and last show on the current page
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;

    // Slice the filteredShows array to get the shows for the current page
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
    console.log('currentShows:', currentShows); // Log the currentShows array

    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update the current page when the user clicks on a different page
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term as the user types
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        setSearchActive(true); // Set searchActive to true to trigger the filtering in the useEffect hook
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission and page refresh
            setSearchActive(true); // Set searchActive to true to trigger the filtering in the useEffect hook
        }
    };

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