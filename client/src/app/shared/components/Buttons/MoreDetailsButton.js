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
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin-left: auto;

  a {
    color: #ffffff;
  }

  &:hover {
    a {
      color: #ffffff;
    }
  }
`;
