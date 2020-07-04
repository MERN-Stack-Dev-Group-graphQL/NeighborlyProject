import React, { useState } from 'react';
import styled from 'styled-components';
import Star from './Star';

const StarRating = ({ totalStars }) => {
  // const [hoverRef, isHovered] = useHover();
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <StarRatingWrapper className='star-rating'>
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < selectedStars} onClick={() => setSelectedStars(i + 1)} />
      ))}
      <div className='selected-stars-count'>
        {selectedStars} of {totalStars} stars
      </div>
    </StarRatingWrapper>
  );
};

export default StarRating;

const StarRatingWrapper = styled.div`
  display: flex;
  align-items: center;

  .selected-stars-count {
    margin-left: 10px;
  }

  .star {
    color: rgba(0, 0, 0, 0.25);
  }

  .star.selected {
    color: rgb(252, 155, 70);
  }
`;
