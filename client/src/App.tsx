import { NotFound, PrivateRoute } from 'components/Common';
import { HomeLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  return (
    <Switch>

      <Route path="/login">
        <LoginPage/>
      </Route>
      
      <Route path="/register">
        <RegisterPage/>
      </Route>

      <PrivateRoute path="/home">
        <HomeLayout/>
      </PrivateRoute>

      <Route>
        <NotFound/>
      </Route>
      
    </Switch>
  );
}

export default App;
