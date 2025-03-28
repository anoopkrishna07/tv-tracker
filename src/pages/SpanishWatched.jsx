import React, { useState, useEffect } from 'react';
import WatchedList from '../components/WatchedList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const SpanishWatched = ({ watchedShows, onRemoveFromWatched }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const showsPerPage = 10;

    const totalShows = watchedShows.length;
    const totalPages = Math.ceil(totalShows / showsPerPage);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;

    const currentShows = watchedShows.slice(indexOfFirstShow, indexOfLastShow);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [watchedShows]);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom component="h1">
                    Spanish Watched Shows
                </Typography>
                <WatchedList watchedShows={currentShows} onRemoveFromWatched={onRemoveFromWatched} />
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

export default SpanishWatched;