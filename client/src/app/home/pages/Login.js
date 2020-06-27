import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../util/hooks';
import gql from 'graphql-tag';
import * as routes from '../../../constants/routes';

import brandLogo from '../../../assets/img/brand/brand-logo.svg';
import dotsTopLeft from '../../../assets/img/patterns/dots-left.svg';
import dotsTopRight from '../../../assets/img/patterns/dots-right-top.svg';
import dotsBottomLeft from '../../../assets/img/patterns/dots-left-bottom.svg';
import dotsBottomRight from '../../../assets/img/patterns/dots-right.svg';
import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [disable, setDisabled] = useState(false);

  const currentYear = new Date().getFullYear();
  const initialState = {
    login: '',
    password: '',
  };

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(__, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  useEffect(() => {
    if (values.password.length === 0 && values.login.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disable, values]);

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div id='login-wrapper'>
      <LoginWrapper>
        <div className='inner'>
          <Link className='d-flex align-items-center justify-content-center' to={routes.HOME}>
            <img className='brand-logo' alt='Neighborly Logo' src={brandLogo} />
          </Link>
          <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
            <div className='title-header login-header'>Log in to Your Account</div>
            <Form.Input
              label='Username'
              placeholder='Username...'
              className='form-input'
              name='login'
              type='text'
              autoComplete='username'
              value={values.login}
              error={errors.login ? true : false}
              onChange={handleChange}
            />
            <Form.Input
              label='Password'
              placeholder='Password...'
              className='form-input'
              name='password'
              type='password'
              autoComplete='new-password'
              value={values.password}
              error={errors.password ? true : false}
              onChange={handleChange}
            />
            <Button disabled={disable} type='submit' className='form-button' primary>
              Login
            </Button>
            <a href='/' className='forgot-password'>
              Forgot password?
            </a>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className='ui error message'>
              <ul className='list'>
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='or-divider'>
            <hr className='hr--block' />
            <span>or</span>
          </div>

          <p>
            Don’t have an account? Sign up <a href={routes.REGISTER}>here</a>.
          </p>
        </div>
        <p className='text-center foot-note'>&copy; 2020 - {currentYear} Neighborly</p>

        {/* Back Home */}
        <Link className='return-home-btn' to={routes.HOME}>
          <MdArrowBack className='arrow-left' /> Return Home
        </Link>
      </LoginWrapper>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
      _id
    }
  }
`;

const LoginWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  -webkit-box-pack: justify;
  background-image: url(${dotsTopLeft}), url(${dotsTopRight}), url(${dotsBottomLeft}), url(${dotsBottomRight});
  background-size: auto 300px;
  background-color: var(--color-secondary);
  background-repeat: no-repeat;
  background-position: left top, right top, left bottom, right bottom;
  color: #fff;
  padding: 4em;

  .inner {
    display: flex;
    max-width: 380px;
    width: 100%;
    align-self: center;
    flex-direction: column;
  }

  .brand-logo {
    display: flex;
    align-self: center;
    max-width: 360px;
    margin: 40px auto;
  }

  .title-header {
    font-size: var(--app-font-size-9);
    font-weight: 300;
    margin: 2rem auto;
  }

  .login-header {
    text-align: center;
    font-weight: 300;
    font-size: var(--app-font-size-8);
  }

  .ui.primary.form-button {
    background-color: var(--color-accent-light);
    color: var(--color-dark);
    text-transform: uppercase;

    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-accent);
    }
  }

  .foot-note {
    align-items: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-top: 40px;
    padding-bottom: 30px;
    width: 100%;
    font-size: 16px;
    font-size: var(--app-font-size-3);
    color: rgba($color: #ffffff, $alpha: 0.85);
  }

  .forgot-password {
    display: block;
    text-align: right;
    font-size: 16px;
    font-size: var(--app-font-size-4);
    font-weight: 300;
    color: rgba($color: #ffffff, $alpha: 0.85);
    margin: 1rem 2rem;
  }

  .or-divider {
    position: relative;
    display: block;
    text-transform: uppercase;
    text-align: center;
    padding: 2rem 0;
    margin: 1rem;

    hr {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    span {
      display: inline-block;
      background: var(--color-secondary);
      font-size: var(--app-font-size-5);
      font-weight: 300;
      padding: 10px;
      margin: 0 auto;
      transform: translateY(-20%);
      top: 50%;
    }
  }

  p {
    color: var(--color-light) !important;
    text-align: center;
    margin: 2rem auto;
  }

  a {
    color: var(--color-light);

    &:hover {
      color: var(--color-accent-light);
    }
  }
`;

export default Login;
