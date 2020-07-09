import React from 'react';
import { MdStar, MdStarHalf } from 'react-icons/md';
import styled from 'styled-components';

const StarCount = ({ starCount, rateCount }) => {
  let content = [];
  for (let i = 0; i < starCount; i++) {
    content.push(<MdStar key={i} />);
  }
  return (
    <StarCountWrapper>
      {content}
      <MdStarHalf />
      {rateCount && <span className='rate-count'>({rateCount})</span>}
    </StarCountWrapper>
  );
};

export default StarCount;

const StarCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: rgb(252, 155, 70);

  .rate-count {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
    margin-left: 10px;
  }
`;
