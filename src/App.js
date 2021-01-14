import React from 'react';

import './App.css';
import Menu from './components/Menu';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import { LocalLibrary } from '@material-ui/icons';

import { Context, Provider } from './context/ApplicationContext';
import Authors from './components/Authors';
import Books from './components/Books';

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

  return (
    <Grid container spacing={3} className={classes.centered}>
      <Provider>
        <Context.Consumer>
          {
            context => 
              <Grid item xs={12} className={classes.centered} onClick={() => context.setView('menu')}>
                <Typography variant='h3' style={{ color: '#fff', marginTop: 40, cursor: 'pointer' }}>
                  <LocalLibrary style={{ fontSize: 30 }}/> <span className={classes.eStyle}>e</span>Library
                </Typography>
              </Grid>
          }
        </Context.Consumer>
        <Context.Consumer>
          {
            context => {
              switch (context.view) {
                case 'menu':
                  return <Menu />;
                case 'authors':
                  return <Authors />;
                case 'books':
                  return <Books />;
                default:
                  return;
              }
            }
          }
        </Context.Consumer>
      </Provider>
    </Grid>
  );
}

export default App;
