import React, { Fragment, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavigationBar from '../app/core/header/NavigationBar';
import Footer from '../app/core/Footer';
import { AuthContext } from '../context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  const component = (props) => (
    <Fragment>
      <NavigationBar />
      <Component {...props} />
      <Footer />
    </Fragment>
  );

  return (
  <Route 
    {...rest} 
    render={(props)=> (!user ? <Redirect to='/login' /> : component(props) )} />);
};

export default PrivateRoute;
