import React, { useEffect } from 'react';

import './App.css';
import getAuthorsService from './services/getAuthorsService';
import Menu from './components/Menu';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import { LocalLibrary } from '@material-ui/icons';

const useStyles = makeStyles({
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eStyle: {
    fontStyle: 'italic',
    color: '#fdd835',
  }
});

const App = () => {

  const classes = useStyles();

  // useEffect(() => {
  //   (async () => {
  //     const authors = await getAuthorsService();
  //     console.log(authors);
  //   })();
  // }, []);

  return (
    <Grid container spacing={3} className={classes.centered}>
      <Grid item xs={12} className={classes.centered}>
        <Typography variant='h3' style={{ color: '#fff', marginTop: 40, }}>
          <LocalLibrary style={{ fontSize: 30 }}/> <span className={classes.eStyle}>e</span>Library
        </Typography>
      </Grid>
      <Menu />  
    </Grid>
  );
}

export default App;
