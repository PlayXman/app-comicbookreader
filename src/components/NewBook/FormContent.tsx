import React, {ChangeEvent, useState} from 'react';
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fileButton: {
    marginBottom: theme.spacing(1)
  }
}));

interface FormProps {
}

const FormContent: React.FC<FormProps> = () => {
  const classes = useStyles();
  const [pictureCount, setPictureCount] = useState(0); //todo change upload text

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setPictureCount(e.target.files.length);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Book Title"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="releaseDate"
            label="Release Date"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" className={classes.fileButton}>
            Select page files
            <input
              id="pages"
              type="file"
              multiple
              onChange={handleFileChange}
              hidden
              accept="image/png,image/jpeg"
            />
          </Button>
          <Typography variant="body1">
            {pictureCount > 0 ? (
              `${pictureCount} page${(pictureCount > 1 ? 's' : '')} ready for upload`
            ) : null}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default FormContent;