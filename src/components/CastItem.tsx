/* eslint-disable*/
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Cast} from '../interfaces/creditsInterface';

interface CastItemProps {
  actor: Cast;
}

export const CastItem = ({actor}: CastItemProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${ actor.profile_path }`;
  return (
    <View style={styles.container}>
      { actor.profile_path && (
        <Image style={styles.image} source={{ uri }} />
      )}
      <View>
        <Text style={styles.actorName}>{ actor.name }</Text>
        <Text style={styles.text}>{ actor.character }</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 10,
    paddingRight: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  actorName: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 2,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    opacity: 0.7,
  }
});
