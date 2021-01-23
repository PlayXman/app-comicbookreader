import React from 'react';
import {AppBar, Container, Fab, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8)
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Home: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h5">Your Books</Typography>
      </Container>
      <Fab color="secondary" size="medium" className={classes.addButton}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Home;