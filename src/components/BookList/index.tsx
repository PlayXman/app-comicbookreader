import React from 'react';
import {Grid} from "@material-ui/core";
import {useContext} from "../DataContext";
import NoBooks from "./NoBooks";
import Book from "./Book";

const BookList: React.FC = () => {
  const {data} = useContext();
  const comicBooks = data?.comicBooks ?? [];

  return (
    <Grid container spacing={2}>
      {comicBooks.length ? (
        comicBooks.map((book) => (
          <Grid key={book.key} item xs={12} sm={6} md={4}>
            <Book
              bookModel={book}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs>
          <NoBooks/>
        </Grid>
      )}
    </Grid>
  );
};

export default BookList;