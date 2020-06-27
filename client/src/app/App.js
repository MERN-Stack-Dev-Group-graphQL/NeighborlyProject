import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider } from '../context/auth';

import PageContainer from './shared/components/PageContainer';
// Routes
import AuthRoute from '../util/AuthRoute';
import PublicRoute from '../util/PublicRoute';
import PrivateRoute from '../util/PrivateRoute';
import * as routes from '../constants/routes';
// Auth
import Login from './home/pages/Login';
import Register from './home/pages/Register';
// Admin
import Admin from './admin/pages/Admin';
// Home
import Home from './home/pages/Home';
import Tools from './home/pages/tools/Tools';
import ToolDetailPage from './home/pages/tools/ToolDetailPage';
import Cart from './home/pages/Cart';
import FAQs from './home/pages/FAQs';
import PrivacyPolicy from './home/pages/PrivacyPolicy';
import TermsAndConditions from './home/pages/TermsAndConditions';
import Contact from './home/pages/Contact';
import SearchResults from './shared/components/SearchResults';
import PageNotFound from './shared/components/PageNotFound';

const App = () => (
  <AuthProvider>
    <PageContainer>
      <Router>
        <Switch>
          <AuthRoute path={routes.LOGIN} component={Login} />
          <AuthRoute path={routes.REGISTER} component={Register} />
          <PrivateRoute path={routes.ADMIN} component={Admin} />
          <PublicRoute exact path={routes.HOME} component={Home} />
          <PublicRoute path={routes.TOOLS} component={Tools} />
          <PublicRoute exact path={routes.TOOL_DETAIL} component={ToolDetailPage} />
          <PublicRoute path={routes.CART} component={Cart} />
          <PublicRoute path={routes.FAQS} component={FAQs} />
          <PublicRoute path={routes.PRIVACY_POLICY} component={PrivacyPolicy} />
          <PublicRoute path={routes.TERMS_AND_CONDITIONS} component={TermsAndConditions} />
          <PublicRoute path={routes.CONTACT} component={Contact} />
          <PublicRoute path={routes.SEARCH_RESULTS} component={SearchResults} />
          <PublicRoute path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </PageContainer>
  </AuthProvider>
);

export default App;

// const Admin = ({ match }) => (
//   <div>
//     <Route path={match.url + routes.NEIGHBORS} component={Neighbors} />
//     <Route path={match.url + routes.DASHBOARD} component={Dashboard} />
//   </div>
// );
