import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Star from '_core/review/star';

const StarRating = ({totalStars}) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <StarRatingWrapper>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < selectedStars}
          onPress={() => setSelectedStars(i + 1)}
        />
      ))}
      <SelectedStars>
        {selectedStars} of {totalStars} stars
      </SelectedStars>
    </StarRatingWrapper>
  );
};

const StarRatingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectedStars = styled.Text`
  margin-left: 10px;
`;

export default StarRating;
