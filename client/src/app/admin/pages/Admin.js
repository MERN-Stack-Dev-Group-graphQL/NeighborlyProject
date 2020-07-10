import React, { Fragment } from 'react';
import { useRouteMatch, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Dashboard from './Dashboard';
import Tools from './Tools';
import Account from './Account';
import Neighbors from './Neighbors';
import Deliveries from './Deliveries';
import Pickups from './Pickups';
import Payouts from './Payouts';
import Settings from './Settings';
import Profile from './Profile';
import styled from 'styled-components';
import * as routes from '../../../constants/routes';

function Admin() {
  const match = useRouteMatch();

  return (
    <Fragment>
      <AdminWrapper className='admin-wrapper'>
        <aside id='admin-sidebar'>
          <AdminSidebar />
        </aside>
        <div id='admin-header'>
          <AdminHeader />
        </div>
        <div id='admin-dashboard'>
          <Route path={match.url + routes.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={match.url + routes.TOOLS}>
            <Tools />
          </Route>
          <Route path={match.url + routes.ACCOUNT}>
            <Account />
          </Route>
          <Route path={match.url + routes.NEIGHBORS}>
            <Neighbors />
          </Route>

          <Route path={match.url + routes.DELIVERIES}>
            <Deliveries />
          </Route>
          <Route path={match.url + routes.PICKUPS}>
            <Pickups />
          </Route>
          <Route path={match.url + routes.PAYOUTS}>
            <Payouts />
          </Route>
          <Route path={match.url + routes.SETTINGS}>
            <Settings />
          </Route>
          <Route path={match.url + routes.PROFILE}>
            <Profile />
          </Route>
        </div>
      </AdminWrapper>
    </Fragment>
  );
}

export default Admin;

const AdminWrapper = styled.section`
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 72px 1fr;

  grid-template-areas:
    'sidebar head head head'
    'sidebar main main main'
    'sidebar main main main'
    'sidebar main main main';
  height: 100vh;

  @media screen and (max-width: 375px) {
    grid-template-columns: 1fr;
    grid-template-rows: 72px 1fr;
    grid-template-areas:
      'head'
      'main';
  }

  #admin-sidebar {
    grid-area: sidebar;

    .navbar-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.1);
      height: 70px;
      min-height: 70px;
      width: 100%;
      padding: 0 14px;
      margin: 0 auto;

      .brand-logo {
        width: 100%;
        max-width: 240px;
      }
    }

    @media (max-width: 375px) {
      display: none;
    }

    @media (min-width: 1200px) {
      transition: width 0.3s ease;
    }
  }

  #admin-header {
    grid-area: head;
  }

  #admin-dashboard {
    grid-area: main;
  }
`;
