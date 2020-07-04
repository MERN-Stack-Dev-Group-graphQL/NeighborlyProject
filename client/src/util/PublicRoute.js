import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '../app/core/header/NavigationBar';
import Footer from '../app/core/Footer';
import { LANDING } from '../constants/routes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const component = (props) => (

    <Fragment>
      <NavigationBar />
      <Component {...props} />
      <Footer />
    </Fragment>
  );

  return <Route {...rest} component={component} />;
};

export default PublicRoute;

