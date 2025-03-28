import React from 'react';
import ShowCard from './ShowCard';
import Button from '@mui/material/Button'; // Import Material UI Button

const WatchedList = ({ watchedShows, onRemoveFromWatched }) => {
    return (
        <div>
            <h2>Watched Shows</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {watchedShows.map((show) => (
                    <div key={show.id}>
                        <ShowCard show={show} onAddToWatched={() => { }} />
                        <Button variant="contained" color="error" onClick={() => onRemoveFromWatched(show.id)}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchedList;