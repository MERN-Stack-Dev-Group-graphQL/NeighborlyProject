import React from 'react';
import * as routes from '../../../constants/routes';
// Icons
import { FiSearch } from 'react-icons/fi';
// Navigation
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

function GuestNavigationBar({ brandLogo, isMenuOpen, activeItem, handleItemClick, menuHandler, overlayHandler }) {
  const primaryMenuItems = [
    {
      name: 'Tools',
      link: '/',
      Icon: '',
    },
    {
      name: 'Neighbors',
      link: '/neighbors',
      Icon: '',
    },
    {
      name: 'Cart',
      link: '/cart',
      Icon: '',
    },
  ];

  const secondaryMenuItems = [
    {
      name: 'Account',
      link: '/account',
      Icon: '',
    },
    {
      name: 'FAQs',
      link: '/faqs',
      Icon: '',
    },
    {
      name: 'Privacy Policy',
      link: '/privacy-policy',
      Icon: '',
    },
    {
      name: 'Terms and Conditions',
      link: '/terms-and-conditions',
      Icon: '',
    },
    {
      name: 'Contact Us',
      link: '/contact-us',
      Icon: '',
    },
  ];

  return (
    <NavigationWrapper>
      <Navbar bg='primary' variant='primary' className='nav-container'>
        <Navbar.Brand href='/'>
          <img src={brandLogo} className='brand-logo' alt='Neighborly' />
        </Navbar.Brand>
        <Form inline className='p-2 flex-grow-1 nav-search-wrapper'>
          <FormControl
            type='text'
            name='search'
            autoComplete='off'
            placeholder='Find a tool...'
            className='mr-sm-2 nav-search-input'
            required
          />
          <Button type='submit' variant='info' className='nav-search-btn'>
            <FiSearch />
          </Button>
        </Form>
        <Nav className='ml-auto nav-menubar-wrapper'>
          <Nav.Link
            href={routes.LOGIN}
            active={activeItem === 'login'}
            onClick={handleItemClick}
            className='btn btn-outline-light btn-login mr-2'
          >
            Login
          </Nav.Link>
          <Nav.Link
            href={routes.REGISTER}
            active={activeItem === 'register'}
            onClick={handleItemClick}
            className='btn btn-outline-light btn-register mr-4'
          >
            Register
          </Nav.Link>
          <div className='hamburger-wrapper' onClick={menuHandler}>
            <button className={`hamburger hamburger--criss-cross ${isMenuOpen ? 'active' : ''}`} type='button' aria-label='Menu'>
              <div className='inner'>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
              </div>
            </button>
          </div>
        </Nav>
      </Navbar>

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
    </NavigationWrapper>
  );
}

export default GuestNavigationBar;

const NavigationWrapper = styled.div`
  .welcome-user {
    display: flex;
    flex-direction: row;

    .avatar {
      display: block;
      width: 40px;
      height: 40px;
      margin-right: 10px;

      img {
        width: 100%;
      }
    }
  }

  .nav-container {
    position: relative;
    width: 100%;
    background-color: var(--color-secondary) !important;
    padding: 1.2rem 1rem !important;
    z-index: 999;

    .brand-logo {
      max-width: 220px;
      margin: 0;
    }

    .nav-search-input {
      height: 50px;
      width: 80%;
      padding: 0.375rem 1.75rem;
      border: none;
    }

    .nav-search-btn {
      height: 50px;
      line-height: 50px;
      min-width: 50px;
      padding: 0;
    }

    a {
      color: rgba(255, 255, 255, 0.85);
    }

    .nav-link {
      height: 50px;
      line-height: 50px;
      padding: 0 0.75rem;
    }

    .btn-login,
    .btn-register {
      font-size: 14px;
      font-size: var(--app-font-size-3);

      &:hover {
        color: var(--color-dark);
      }
    }

    header.header .hamburger-wrapper {
      display: flex;
      justify-content: flex-end;
    }

    .hamburger {
      width: 47px;
      height: 47px;

      .inner {
        position: relative;
        margin: 0;
        width: 100%;
        margin-top: -1px;
      }

      &:focus {
        outline: none;
      }
    }

    .hamburger {
      background: 0 0;
      border: 0 transparent solid;
      padding: 4.7px;
      display: inline-block;
      cursor: pointer;
      font: inherit;
      color: inherit;
      text-transform: none;
      margin: 0;
      overflow: visible;
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      span.bar {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        position: absolute;
        background-color: var(--color-light);
        border-radius: 0;
      }

      span.bar:nth-child(1) {
        top: -8px;
        transition-delay: 0.22s;
      }

      span.bar:nth-child(2) {
        transition-delay: 0.24s;
      }

      span.bar:nth-child(3) {
        top: 8px;
      }
    }

    .hamburger--criss-cross {
      .inner {
        &::before,
        &::after {
          content: '';
          width: 100%;
          height: 2px;
          display: block;
          position: absolute;
          background-color: var(--color-light);
          border-radius: 0;
          left: 5.51px;
          transform-origin: 0 50%;
          transition: opacity 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1);
          opacity: 0;
        }

        &::after {
          transform: rotate(-45deg);
          top: 13.29px;
          transition-delay: 0.0666666667s;
          opacity: 0;
        }

        &::before {
          transform: rotate(45deg);
          top: -13.29px;
          opacity: 0;
        }
      }

      span.bar {
        transition: transform 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1),
          width 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1);
      }

      span.bar:nth-child(3) {
        transition-delay: 0.26s;
      }
    }

    .active {
      .inner {
        &::before,
        &::after {
          height: 2px;
          display: block;
          position: absolute;
          background-color: #ffffff;
          border-radius: 0;
          left: 5.51px;
          transition: opacity 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.2666666667s cubic-bezier(0.645, 0.045, 0.355, 1);
          opacity: 1;
          width: 100%;
        }

        &::after {
          transform: rotate(-45deg);
          top: 13.29px;
          transition-delay: 0.3333333333s;
        }

        &::before {
          transform: rotate(45deg);
          top: -13.29px;
        }
      }

      span.bar {
        transform: translate3D(0px, 0, 0);
        opacity: 0;
        width: 50%;
      }
    }
  }

  .mobile-nav {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    max-height: 0;
    min-height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    transition: all 200ms ease-in-out;
    z-index: 998;

    .menu-list {
      position: relative;
      background-color: var(--color-light);
      text-transform: uppercase;
      transform: translateX(100%);
      width: 100%;
      max-width: 300px;
      max-height: 0;
      min-height: 100vh;
      padding: 8rem 2rem 2rem;
      transition: transform 200ms ease;
      top: 0;
      right: 0;
      z-index: 999;

      .menu-item {
        list-style: none;
        font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        font-weight: 500;
        font-size: 1.8rem;

        a {
          color: var(--color-secondary);

          &:hover {
            color: var(--color-primary);
          }
        }
      }
    }
  }

  .mobile-nav-show {
    visibility: visible;
    opacity: 1;

    .menu-list {
      transform: translateX(0);
    }
  }

  .menu-primary-navigation-container {
    margin-left: 0;
    margin-bottom: 1.5rem;
    padding-left: 0;
    padding-bottom: 2rem;
    border-bottom: 1px solid #d8d8d8;
  }

  #menu-secondary-navigation {
    padding-left: 0;
    margin: 0;
    color: var(--color-primary);

    li {
      list-style: none;
      text-transform: none;

      .nav-link {
        padding: 0.5rem 0 0 1rem;
      }
    }
  }
`;
