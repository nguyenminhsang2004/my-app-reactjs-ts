import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { User } from 'models';
import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import RegisterForm from '../components/RegisterForm';

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

const initialValue: User = {
    id:'',
    fullName:'',
    email: '',
    passWord: '',
    gender: 'male',
    imageUrl:'',
}

export default function RegisterPage () {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRegisterFormSubmit = (formValue: User) => {
    dispatch(authActions.register(formValue));
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">Register</Typography>

        <Box mt={4}>
          <RegisterForm initialValue={initialValue} onSubmit={handleRegisterFormSubmit}/>
        </Box>
      </Paper>
    </div>
  );
}
