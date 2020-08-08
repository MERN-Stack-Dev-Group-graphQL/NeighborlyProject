import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SEARCH_TOOLS_QUERY } from '../../../util/graphql';
import { useForm } from '../../../util/hooks';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import MenuBar from './MenuBar';
import styled from 'styled-components';
import * as routes from '../../../constants/routes';

function GuestNavigationBar({ brandLogo, isMenuOpen, activeItem, handleItemClick, menuHandler, overlayHandler }) {
  const findTools = () => {
    console.log('find tools ran', values.search ? values.search : 'nothing to see here');
  };
  const initialState = { search: '' };
  const { handleChange, handleSubmit, values } = useForm(findTools, initialState);
  const { data } = useQuery(SEARCH_TOOLS_QUERY, {
    variables: { search: values.search },
  });

  if (data) {
    var tools = data;
  }

  const primaryMenuItems = [
    {
      name: 'Tools',
      link: '/tools',
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
      name: 'Dashboard',
      link: '/login',
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
      link: '/contact',
      Icon: '',
    },
  ];

  return (
    <Fragment>
      <NavigationWrapper>
        <Navbar bg='primary' variant='primary' className='nav-container'>
          <Navbar.Brand href='/'>
            <img src={brandLogo} className='brand-logo' alt='Neighborly' />
          </Navbar.Brand>
          <Form inline onSubmit={handleSubmit} className='p-2 flex-grow-1 nav-search-wrapper'>
            <FormControl
              type='text'
              name='search'
              autoComplete='off'
              onChange={handleChange}
              value={values.search}
              placeholder='Find a tool...'
              className='mr-sm-2 nav-search-input'
              id='search-input'
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
            <Nav.Link href={routes.CART} className='nav-cart-icon'>
              <span className='cart-pill'>3</span>
              <MdShoppingCart size={24} className='cart-icon' />
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

        <MenuBar
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          isMenuOpen={isMenuOpen}
          overlayHandler={overlayHandler}
        />
      </NavigationWrapper>
      {tools ? (
        <AutoCompleteWrapper>
          <div className='container'>
            <div className='row'>
              <ul className='search-results-dropdown'>
                {tools &&
                  tools.searchTools.map((tool, index) => (
                    <li className='form-option' key={index}>
                      <Link className='btn-search-link' to={`/tool-detail/${tool._id}`}>
                        <span>{tool.make}:</span> {tool.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </AutoCompleteWrapper>
      ) : (
        ''
      )}
    </Fragment>
  );
}

export default GuestNavigationBar;

const AutoCompleteWrapper = styled.div`
  position: relative;

  .search-results-dropdown {
    position: absolute;
    width: 100%;
    max-width: 920px;
    text-align: left;
    margin-top: -20px;
    background: #ffffff;
    padding: 10px 0;
    width: 100%;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    list-style: none;
    z-index: 999;

    li {
      padding: 6px 1rem;

      .btn-search-link {
        display: block;
        text-decoration: none;
      }

      span {
        font-weight: bold;
      }

      &:hover {
        background: #f2f2f2;
        cursor: pointer;
      }
    }
  }
`;

const NavigationWrapper = styled.div`
  .nav-search-wrapper {
    position: relative;
  }

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
      border-radius: 25px 0 0 25px;
      border: none;
    }

    .nav-search-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      line-height: 50px;
      min-width: 50px;
      padding: 0 5px 0 0;
      border-radius: 0 25px 25px 0;
      background-color: var(--color-primary) !important;
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
      background: #dcdfe3;
      color: #1d2329;

      &:hover {
        background: #ffffff;
        color: #1d2329;
      }
    }

    .nav-cart-icon {
      position: relative;

      .cart-pill {
        position: absolute;
        display: block;
        background-color: var(--color-primary);
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        padding: 0px 6px;
        top: 0;
        right: 0;
        border-radius: 10px;
      }

      .cart-icon {
        margin-bottom: 3px;
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
