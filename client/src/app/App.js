import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/auth';
import { ToolProvider } from '../context/tool';
import Login from './home/pages/Login';
import Register from './home/pages/Register';
import Home from './home/pages/Home';
import AuthRoute from '../util/AuthRoute';
import PublicRoute from '../util/PublicRoute';
import * as routes from '../constants/routes';
import PageContainer from './shared/components/PageContainer';
import Contact from './home/pages/Contact';

const App = () => (
  <AuthProvider>
<<<<<<< Updated upstream
    <PageContainer>
      <Router>
        <AuthRoute exact path={routes.LOGIN} component={Login} />
        <AuthRoute exact path={routes.REGISTER} component={Register} />
        <PublicRoute exact path={routes.HOME} component={Home} />
      </Router>
    </PageContainer>
=======
    <ToolProvider>
      <PageContainer>
        <Router>
          <AuthRoute exact path={routes.LOGIN} component={Login} />
          <AuthRoute exact path={routes.REGISTER} component={Register} />
          <PublicRoute exact path={routes.HOME} component={Home} />
          <PrivateRoute exact path={routes.ACCOUNT} component={Account} />
          <PublicRoute exact path={routes.CONTACT} component={Contact} />
        </Router>
      </PageContainer>
    </ToolProvider>
>>>>>>> Stashed changes
  </AuthProvider>
);

export default App;
