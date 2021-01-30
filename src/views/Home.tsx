import React, {useEffect} from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import BookList from "../components/BookList";
import Books from "../models/Books";
import {useContext} from "../components/DataContext";
import NewBook from "../components/NewBook";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const {setData} = useContext();

  useEffect(() => {
    Books.getAll().then((list) => {
      setData({comicBooks: list});
    });
  }, [setData]);

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h5" className={classes.title}>Your Books</Typography>

        <BookList/>
      </Container>
      <NewBook/>
    </>
  );
};

export default Home;