import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../util/hooks';
import { MdArrowBack } from 'react-icons/md';
import gql from 'graphql-tag';
import brandLogo from '../../../assets/img/brand/brand-logo.svg';
import dotsTopLeft from '../../../assets/img/patterns/dots-left.svg';
import dotsTopRight from '../../../assets/img/patterns/dots-right-top.svg';
import dotsBottomLeft from '../../../assets/img/patterns/dots-left-bottom.svg';
import dotsBottomRight from '../../../assets/img/patterns/dots-right.svg';
import * as routes from '../../../constants/routes';
import styled from 'styled-components';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [disable, setDisabled] = useState(false);

  const currentYear = new Date().getFullYear();
  const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { handleChange, handleSubmit, values } = useForm(registerUserCallback, initialState);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    registerUser();
  }

  return (
    <div id='login-wrapper'>
      <RegisterWrapper>
        <div className='inner'>
          <Link className='d-flex align-items-center justify-content-center' to={routes.HOME}>
            <img className='brand-logo' alt='Neighborly Logo' src={brandLogo} />
          </Link>
          <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
            <div className='title-header registration-header'>Sign Up for an Account</div>
            <Form.Input
              label='Username'
              placeholder='Username...'
              className='form-input'
              name='username'
              type='text'
              autoComplete='username'
              value={values.username}
              error={errors.username ? true : false}
              onChange={handleChange}
            />
            <Form.Input
              label='First Name'
              placeholder='First Name...'
              className='form-input'
              name='firstName'
              type='text'
              value={values.firstName}
              error={errors.firstName ? true : false}
              onChange={handleChange}
            />
            <Form.Input
              label='Last Name'
              type='text'
              placeholder='Last Name...'
              className='form-input'
              name='lastName'
              value={values.lastName}
              error={errors.lastName ? true : false}
              onChange={handleChange}
            />
            <Form.Input
              label='Email'
              type='email'
              autoComplete='username'
              placeholder='Email...'
              className='form-input'
              name='email'
              value={values.email}
              error={errors.email ? true : false}
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
            <Form.Input
              label='Confirm Password'
              placeholder='Confirm Password...'
              className='form-input'
              name='confirmPassword'
              type='password'
              autoComplete='new-password'
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={handleChange}
            />
            <Button type='submit' className='form-button' primary>
              Register
            </Button>
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

          <p>
            Already have an account? Sign in <a href={routes.LOGIN}>here</a>.
          </p>
        </div>
        <p className='text-center foot-note'>&copy; 2020 - {currentYear} Neighborly</p>

        <Link className='return-home-btn' to={routes.HOME}>
          <MdArrowBack className='arrow-left' /> Return Home
        </Link>
      </RegisterWrapper>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        username: $username
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      _id
    }
  }
`;

const RegisterWrapper = styled.div`
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

  .registration-header {
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

  p {
    color: var(--color-light) !important;
    text-align: center;
    margin: 2rem auto;
  }
`;

export default Register;
