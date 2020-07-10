import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import brandLogo from '../../../assets/img/brand/brand-logo.svg';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { menuOptions } from '../../../constants/menus';

function AdminSidebar() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <Navbar.Brand href='/'>
        <img src={brandLogo} className='brand-logo' alt='Neighborly' />
      </Navbar.Brand>
      <SidebarMenu>
        {menuOptions.map((item) => (
          <SidebarMenuItem onClick={() => history.push(item.path)}>
            <Icon>{item.icon}</Icon>
            <SidebarMenuItemLabel>{item.label}</SidebarMenuItemLabel>
          </SidebarMenuItem>
        ))}
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
