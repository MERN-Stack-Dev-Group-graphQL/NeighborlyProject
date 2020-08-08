import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MoreDetailsButton = ({ toolId }) => {
  return (
    <MoreDetailButton>
      <Link to={`/tool-detail/${toolId}`} className='btn mr-1'>
        Details
      </Link>
    </MoreDetailButton>
  );
};

export default MoreDetailsButton;

const MoreDetailButton = styled.div`
  background: var(--color-primary-light);
  border: 1px solid var(--color-primary-light);
  border-radius: 20px;
  height: 40px;
  min-width: 120px;
  text-align: center;
  margin-left: auto;

  a {
    text-transform: uppercase;
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    color: #ffffff;
  }

  &:hover {
    a {
      color: #ffffff;
    }
  }
`;
