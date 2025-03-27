import React from 'react';
import ShowCard from './ShowCard';

const WatchedList = ({ watchedShows, onRemoveFromWatched }) => {
  return (
    <div>
      <h2>Watched Shows</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {watchedShows.map((show) => (
          <div key={show.id}>
            <ShowCard show={show} onAddToWatched={() => {}} />
            <button onClick={() => onRemoveFromWatched(show.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedList;