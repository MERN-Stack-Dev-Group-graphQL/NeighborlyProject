import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Star from '_core/review/star';

const styles = StyleSheet.create({
  starRatingsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedStars: {
    marginLeft: 10,
  },
});

const StarRating = ({totalStars}) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <View style={styles.starRatingsWrapper}>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < selectedStars}
          onPress={() => setSelectedStars(i + 1)}
        />
      ))}
      <Text style={styles.selectedStars}>
        {selectedStars} of {totalStars} stars
      </Text>
    </View>
  );
};

export default StarRating;
