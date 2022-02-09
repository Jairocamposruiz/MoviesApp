/* eslint-disable*/
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Movie} from '../interfaces/movieInterface';

interface MovieCardProps {
  movie: Movie;
  height?: number;
  width?: number;
  marginHorizontal?: number;
}

export const MovieCard = ({
  movie,
  height = 420,
  width = 300,
  marginHorizontal,
}: MovieCardProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate('DetailScreen', movie)}
      activeOpacity={0.8}
      style={ {
        width,
        height,
        marginHorizontal,
      }}
    >
      <View style={ styles.imageContainer }>
        <Image style={ styles.image } source={ { uri } } />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
