import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { Favorite, NoteOutlined, Person, PostAddOutlined } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import { dashboardAction, selectDashboardLoading, selectDashboardStatistics } from './dashboardSlice';

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

  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  useEffect(() => {
    dispatch(dashboardAction.fetchData())    
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading}/>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PostAddOutlined fontSize="large" color="secondary"/>}
            label='Post Count'
            value={statistics.postCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<NoteOutlined fontSize="large" color="secondary"/>}
            label='Note Count'
            value={statistics.noteCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Favorite fontSize="large" color="secondary"/>}
            label='Like Count'
            value={statistics.likeCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Person fontSize="large" color="secondary"/>}
            label='Order'
            value={statistics.other}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
