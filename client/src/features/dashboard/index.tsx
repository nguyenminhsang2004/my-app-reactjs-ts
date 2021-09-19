import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { Favorite, NoteOutlined, Person, PostAddOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { setInterval } from 'timers';
import StatisticItem from './components/StatisticItem';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),

  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  }
}))

export default function Dashboard() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadingInterval = setInterval(() => {
      setLoading(false);
    },3000);

    return clearInterval(loadingInterval);
    
  }, []);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading}/>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PostAddOutlined fontSize="large" color="secondary"/>}
            label='Post Count'
            value={150}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<NoteOutlined fontSize="large" color="secondary"/>}
            label='Note Count'
            value={5}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Favorite fontSize="large" color="secondary"/>}
            label='Like Count'
            value={2000}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Person fontSize="large" color="secondary"/>}
            label='Order'
            value={20}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
