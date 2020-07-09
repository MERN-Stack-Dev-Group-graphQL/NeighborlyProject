import React, { Fragment } from 'react';
import styled from 'styled-components';

function PageContainer(props) {
  return (
    <Fragment>
      <Container>{props.children}</Container>
    </Fragment>
  );
}
export default PageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  background: #f6f6f6;
`;
