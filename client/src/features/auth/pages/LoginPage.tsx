import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { LoginPayLoad } from 'models';
import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  }
}));

const initialValue: LoginPayLoad = {
  email: '',
  passWord: ''
}

export default function LoginPage () {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLoginFormSubmit = (formValue: LoginPayLoad) => {
    dispatch(authActions.login(formValue));
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">Login</Typography>

        <Box mt={4}>
          <LoginForm initialValue={initialValue} onSubmit={handleLoginFormSubmit}/>
        </Box>
      </Paper>
    </div>
  );
}
