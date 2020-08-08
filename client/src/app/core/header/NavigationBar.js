import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import UserNavigationBar from './UserNavigationBar';
import GuestNavigationBar from './GuestNavigationBar';
import brandLogo from '../../../assets/img/brand/brand-logo.svg';

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(path);
  const menuHandler = () => setIsMenuOpen(!isMenuOpen);
  const overlayHandler = () => setIsMenuOpen(!isMenuOpen);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const navcontrol = {
    brandLogo,
    user,
    logout,
    isMenuOpen,
    activeItem,
    menuHandler,
    overlayHandler,
    handleItemClick,
  };

  const navigationBar = user ? <UserNavigationBar {...navcontrol} /> : <GuestNavigationBar {...navcontrol} />;

  return navigationBar;
}

export default NavigationBar;
