import React, {FormEvent, useRef, useState} from 'react';
import {
  AppBar,
  Button, Container,
  Dialog,
  Fab,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  SlideProps,
  Toolbar,
  Typography
} from "@material-ui/core";
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import FormContent from './FormContent';

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(2)
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    padding: theme.spacing(4),
    background: theme.palette.background.default
  }
}));

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewBook: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (formRef) {
      formRef?.current?.requestSubmit();
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');


    /* todo (function(){
    let e = document.getElementById('pictures');
      for(let i = 0; i < e.files.length; i++) {

        let file = e.files[i];
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.width = 300;

        e.parentElement.append(img);

      }
    })()
     */
  }

  return (
    <>
      <Fab color="secondary" size="medium" className={classes.addButton} onClick={handleOpen}>
        <AddTwoToneIcon/>
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseTwoToneIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Comic Book
            </Typography>
            <Button color="inherit" variant="outlined" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Paper elevation={0} className={classes.container}>
            <form onSubmit={handleSubmit} ref={formRef}>
              <FormContent/>
            </form>
          </Paper>
        </Container>
      </Dialog>
    </>
  );
};

export default NewBook;