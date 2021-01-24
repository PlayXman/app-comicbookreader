import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: 'center'
  }
});

const NoBooks: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        Start with adding a new comic book
      </Typography>
    </div>
  );
};

export default NoBooks;