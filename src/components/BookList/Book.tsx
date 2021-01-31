import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";
import BookModel from "../../models/Book";
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: theme.spacing(37),
    objectPosition: '0 60%'
  },
  pageCountIcon: {
    verticalAlign: 'bottom'
  }
}));

interface BookProps {
  bookModel: BookModel
}

const Book: React.FC<BookProps> = ({bookModel}) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    bookModel.getCoverImage().then((url) => {
      setImageUrl(url);
    });
  }, [bookModel]);

  return (
    <Card>
      <CardActionArea component={Link} to={`/book/${bookModel.key}`}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt=""
          className={classes.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {bookModel.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <ImportContactsTwoToneIcon
              fontSize="small"
              className={classes.pageCountIcon}
            /> {bookModel.currentPageIndex + 1}/{bookModel.totalPageCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Book;