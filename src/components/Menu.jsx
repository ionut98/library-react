import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { MenuBook, PermIdentity } from '@material-ui/icons';

const useStyles = makeStyles({
  menuButton: {
    height: 150,
    borderRadius: 10,
    border: '0.5px solid #fff',
    backgroundColor: '#fff',
    fontSize: 30,
    fontFamily: 'Calibri',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    marginTop: 150,
  },
  iconStyle: {
    fontSize: 70,
    color: '#fdd835',
  },
});

const Main = () => {

  const classes = useStyles();

  return (
    <>
      <Grid item xs={2} className={classes.menuContainer}>
        <Button fullWidth className={classes.menuButton}>
          <Grid container>
            <Grid item xs={12}>
              <PermIdentity className={classes.iconStyle}/> 
            </Grid>
            <Grid item xs={12}>
              Authors
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={2} className={classes.menuContainer}>
        <Button fullWidth className={classes.menuButton}>
          <Grid container>
            <Grid item xs={12}>
              <MenuBook className={classes.iconStyle}/> 
            </Grid>
            <Grid item xs={12}>
              Books
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </>
  );

};

export default Main;
