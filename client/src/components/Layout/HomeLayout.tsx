import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard';
import Note from 'features/note';
import Post from 'features/posts';
import React from 'react';
import { Route, Switch } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px 1fr',
    gridTemplateAreas: ` "header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header:{
    gridArea: 'header',
    backgroundColor: theme.palette.background.paper,
  },

  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },

  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  }
}))

export function HomeLayout () {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header/>
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar/>
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/home/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/home/post">
            <Post/>
          </Route>
          <Route path="/home/note">
            <Note/>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
