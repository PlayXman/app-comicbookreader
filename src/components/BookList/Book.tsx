import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';

interface BookProps {
  title: string;
  coverImageSrc: string;
}

const Book: React.FC<BookProps> = ({title, coverImageSrc}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={coverImageSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Book;