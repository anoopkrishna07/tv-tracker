import React from 'react';
import ShowCard1 from './ShowCard1';
import Button from '@mui/material/Button';

const WatchedList = ({ watchedShows, onRemoveFromWatched }) => {
    return (
        <div>
            <h2>Watched Shows</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {watchedShows.map((show) => (
                    <div key={show.id}>
                        <ShowCard1 show={show} onAddToWatched={() => { }} />
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