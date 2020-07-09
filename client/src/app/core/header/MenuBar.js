import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';

const MenuBar = ({ primaryMenuItems, secondaryMenuItems, isMenuOpen, overlayHandler }) => {
  return (
    <Fragment>
      <div className={isMenuOpen ? 'mobile-nav mobile-nav-show' : 'mobile-nav'}>
        <div className={isMenuOpen ? 'overlay d-block' : 'overlay'} onClick={overlayHandler}></div>
        <div className='menu-list'>
          <ul id='menu-primary-navigation' className='menu-primary-navigation-container'>
            {primaryMenuItems.map((item, index) => (
              <li className='menu-item' key={index}>
                <Nav.Link href={item.link}>{item.name}</Nav.Link>
              </li>
            ))}
          </ul>
          <ul id='menu-secondary-navigation'>
            {secondaryMenuItems.map((item, index) => (
              <li key={index}>
                <Nav.Link href={item.link}>{item.name}</Nav.Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MenuBar;
