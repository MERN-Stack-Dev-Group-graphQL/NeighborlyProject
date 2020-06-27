import React, { useContext, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import * as routes from '../constants/routes';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const component = (props) =>
    !user ? (
      <Redirect to={routes.DASHBOARD} />
    ) : (
      <Fragment>
        <Component {...props} />
      </Fragment>
    );

  return <Route {...rest} component={component} />;
};

export default AdminRoute;
