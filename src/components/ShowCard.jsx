import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const ShowCard = ({ show, onAddToWatched }) => {
  const imageUrl = show.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : 'placeholder_image.png'; // Or a placeholder

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={show.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {show.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {show.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onAddToWatched(show)}>Add to Watched</Button>
      </CardActions>
    </Card>
  );
};

export default ShowCard;