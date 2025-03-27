import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <TextField
        label="Search TV Shows"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ width: '300px' }}
      />
      <IconButton onClick={handleSearchClick} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;