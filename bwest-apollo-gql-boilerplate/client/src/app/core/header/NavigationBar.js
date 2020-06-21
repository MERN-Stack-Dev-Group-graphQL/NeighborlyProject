import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import * as routes from '../../../constants/routes';
// Icons
import { FiSearch } from 'react-icons/fi';
// Navigation
import brandLogo from '../../../assets/img/brand/brand-logo.svg';
import avatarDefault from '../../../assets/img/avatars/avatar-default.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHandler = () => {
    console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const navigationBar = user ? (
    <NavigationWrapper>
      <Navbar bg='primary' variant='primary' className='nav-container'>
        <Navbar.Brand href='/'>
          <img src={brandLogo} className='brand-logo p-2' alt='Neighborly' />
        </Navbar.Brand>
        {/* searchbar */}
        <Form inline className='p-2 flex-grow-1'>
          <FormControl type='text' name='search' autoComplete='off' placeholder='Search' className='mr-sm-2 nav-search-input' required />
          <Button type='submit' variant='info' className='nav-search-btn'>
            <FiSearch />
          </Button>
        </Form>
        <Nav className='ml-auto p-2'>
          <Nav.Link>
            <div className='item welcome-user'>
              <div className='avatar'>
                <img src={user.avatar ? user.avatar : avatarDefault} alt={user.username} />
              </div>
              <div className='name'>
                {user.firstName} {user.lastName}
              </div>
            </div>
          </Nav.Link>
          <Nav.Link active={activeItem === 'logout'} onClick={logout} className='btn btn-outline-light btn-login mr-2'>
            Logout
          </Nav.Link>
          <div className={`hamburger hamburger--criss-cross ${isMenuOpen ? 'active' : ''}`} onClick={menuHandler}>
            <button className='hamburger hamburger--criss-cross' type='button' aria-label='Menu'>
              <div className='inner'>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
              </div>
            </button>
          </div>
        </Nav>
      </Navbar>

      <div className={isMenuOpen ? 'mobile-nav-show' : 'mobile-nav'}>
        <ul className='menu-list'>
          <li className='menu-item'>
            <Nav.Link>Tools</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link href='/add-tool'>Add Tool</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>DYI</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>Neighbors</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>About</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>Contact</Nav.Link>
          </li>
        </ul>
      </div>
    </NavigationWrapper>
  ) : (
    <NavigationWrapper>
      <Navbar bg='primary' variant='primary' className='nav-container'>
        <Navbar.Brand href='/'>
          <img src={brandLogo} className='brand-logo' alt='Neighborly' />
        </Navbar.Brand>
        {/* searchbar */}
        <Form inline className='p-2 flex-grow-1'>
          <FormControl type='text' name='search' autoComplete='off' placeholder='Search' className='mr-sm-2 nav-search-input' required />
          <Button type='submit' variant='info' className='nav-search-btn'>
            <FiSearch />
          </Button>
        </Form>
        <Nav className='ml-auto'>
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
      <div className={isMenuOpen ? 'mobile-nav-show' : 'mobile-nav'}>
        <ul className='menu-list'>
          <li className='menu-item'>
            <Nav.Link>Tools</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>DYI</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>Neighbors</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>About</Nav.Link>
          </li>
          <li className='menu-item'>
            <Nav.Link>Contact</Nav.Link>
          </li>
        </ul>
      </div>
    </NavigationWrapper>
  );

  return navigationBar;
}

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

  .mobile-nav {
    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    max-height: 0;
    min-height: 100vh;
    -webkit-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
    transition: all 250ms ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1007;
    color: #3f4555;
  }

  .mobile-nav-show {
    display: flex;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: visible;
    opacity: 1;
    overflow: hidden;
    max-height: 0;
    min-height: 100vh;
    transition: all 250ms ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    color: #ffffff;

    .menu-list {
      background-color: var(--color-secondary);
      text-transform: uppercase;
      max-width: 300px;
      max-height: 0;
      min-height: 100vh;
      padding: 8rem 2rem 2rem;
      top: 0;
      right: 0;

      .menu-item {
        list-style: none;
        font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        font-weight: 500;
        font-size: 2rem;

        a {
          color: var(--color-light);
          transition: all 0.3s ease;

          &:hover {
            color: var(--color-primary);
          }
        }
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
      &:hover {
        color: var(--color-dark);
      }
    }

    header.header .hamburger-wrapper {
      display: flex;
      justify-content: flex-end;
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

    .hamburger {
      width: 47px;
      height: 47px;

      .inner {
        position: relative;
        margin: 0;
        width: 100%;
        margin-top: -1px;
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
  }
`;

export default NavigationBar;
