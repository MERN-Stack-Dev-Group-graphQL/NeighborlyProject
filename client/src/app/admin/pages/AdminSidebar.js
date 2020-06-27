import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import brandLogo from '../../../assets/img/brand/brand-logo.svg';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsTools } from 'react-icons/bs';
import { FiPieChart } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiDashboardLine } from 'react-icons/ri';
import { RiCommunityLine } from 'react-icons/ri';
import { RiRoadMapLine } from 'react-icons/ri';
import { RiMapPin2Line } from 'react-icons/ri';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { RiCurrencyLine } from 'react-icons/ri';

import { useHistory } from 'react-router-dom';

function AdminSidebar() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <Navbar.Brand href='/'>
        <img src={brandLogo} className='brand-logo' alt='Neighborly' />
      </Navbar.Brand>
      <SidebarMenu>
        <SidebarMenuItem onClick={() => history.push('/admin/dashboard')}>
          <Icon>
            <RiDashboardLine size='20' />
          </Icon>
          <SidebarMenuItemLabel>Dashboard</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/tools')}>
          <Icon>
            <BsTools size='20' />
          </Icon>
          <SidebarMenuItemLabel>Tools</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/account')}>
          <Icon>
            <FiPieChart size='20' />
          </Icon>
          <SidebarMenuItemLabel>Account</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/neighbors')}>
          <Icon>
            <RiCommunityLine size='20' />
          </Icon>
          <SidebarMenuItemLabel>Neighbors</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/deliveries')}>
          <Icon>
            <RiMapPin2Line size='20' />
          </Icon>
          <SidebarMenuItemLabel>Deliveries</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/pickups')}>
          <Icon>
            <RiRoadMapLine size='20' />
          </Icon>
          <SidebarMenuItemLabel>Pickups</SidebarMenuItemLabel>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem onClick={() => history.push('/admin/payouts')}>
          <Icon>
            <RiCurrencyLine size='20' />
          </Icon>
          <SidebarMenuItemLabel>Payouts</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/settings')}>
          <Icon>
            <AiOutlineSetting size='20' />
          </Icon>
          <SidebarMenuItemLabel>Settings</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => history.push('/admin/profile')}>
          <Icon>
            <FaRegUserCircle size='20' />
          </Icon>
          <SidebarMenuItemLabel>Profile</SidebarMenuItemLabel>
        </SidebarMenuItem>
      </SidebarMenu>
      <MenuSignOut onClick={logout} className='admin-signout-btn'>
        <Icon>
          <RiLogoutCircleRLine />
        </Icon>
        <SidebarMenuItemLabel>Sign Out</SidebarMenuItemLabel>
      </MenuSignOut>
    </SidebarContainer>
  );
}

export default AdminSidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #f0f0f0;
  height: 100vh;
  background: var(--color-secondary);
  transition: width 0.3s ease;
`;

const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  width: 100%;
  padding-left: 0px;
  margin-top: 1rem;
`;

const SidebarMenuItem = styled.li`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  padding-left: 30px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 3px 0 0 0 #ffffff;
    cursor: pointer;
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;

const SidebarMenuItemLabel = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  text-align: left;
  padding: 0;
  margin-bottom: 0;
  margin-left: 20px;
  color: #ffffff;
`;

const MenuSignOut = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 40px;
  width: 100%;
  height: 40px;
  color: #fff;
  margin-top: auto;
  padding: 20px 0px 20px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 3px 0 0 0 #ffffff;
    cursor: pointer;
  }
`;
