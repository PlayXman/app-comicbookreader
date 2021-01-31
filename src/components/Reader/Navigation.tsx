import React from 'react';
import {AppBar, IconButton, makeStyles, Toolbar} from '@material-ui/core';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    top: 'auto',
    bottom: 0
  },
  spacer: {
    flexGrow: 1
  }
});

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({onPrev, onNext}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          component={Link}
          to="/"
        >
          <AppsTwoToneIcon/>
        </IconButton>
        <div className={classes.spacer}/>
        <IconButton color="inherit" onClick={onPrev}>
          <NavigateBeforeTwoToneIcon/>
        </IconButton>
        <IconButton edge="end" color="inherit" onClick={onNext}>
          <NavigateNextTwoToneIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;