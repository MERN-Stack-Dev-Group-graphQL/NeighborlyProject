import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';

const PageNotFound = ({ location }) => {
  const pathName = location.pathname;
  const path = pathName.substr(1);
  console.log(path);

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <PageNotFoundWrapper className='page-not-found__wrapper'>
              <h1>404 page not found</h1>
              <p>
                We are sorry but the page you are looking for titled <span className='pathname'>{path}</span> does not exist.
              </p>
              <Nav.Link href='/'>Return home</Nav.Link>
            </PageNotFoundWrapper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageNotFound;

const PageNotFoundWrapper = styled.div`
  padding: 6rem 2rem;
  text-align: center;

  .pathname {
    font-weight: bold;
  }
`;
