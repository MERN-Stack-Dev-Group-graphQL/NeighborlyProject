import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const FooterSlide = ({header, description, last, onPress, onSkip}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.footerButtons}>
        {last ? (
          <View />
        ) : (
          <TouchableOpacity onPress={onSkip} style={{flex: 1}}>
            <View>
              <Text style={styles.skipText}>Skip</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity {...{onPress}} style={{flex: 1}}>
          <View
            style={[
              styles.cta,
              {backgroundColor: last ? '#0B57BF' : '#ECA900'},
            ]}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>
              {last ? "Let's get Started" : 'Next'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.75)',
    marginBottom: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
});

export default FooterSlide;
