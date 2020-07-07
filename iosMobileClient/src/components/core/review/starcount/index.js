import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

MaterialCommunityIcons.loadFont();

const StarCount = ({starCount, rateCount}) => {
  let content = [];
  for (let i = 0; i < starCount; i++) {
    content.push(
      <MaterialCommunityIcons
        name="star"
        color={'rgb(252, 155, 70)'}
        size={14}
        key={i}
      />,
    );
  }

  return (
    <StarCountWrapper>
      {content}
      <MaterialCommunityIcons
        name="star"
        color={'rgba(0,0,0,0.25)'}
        size={14}
      />
      {rateCount && <RateCountWrapper>({rateCount})</RateCountWrapper>}
    </StarCountWrapper>
  );
};

const StarCountWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  color: rgb(252, 155, 70);
`;

const RateCountWrapper = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.25);
  margin-left: 10px;
`;

export default StarCount;
