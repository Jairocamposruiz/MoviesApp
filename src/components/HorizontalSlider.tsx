import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {MovieCard} from './MovieCard';

interface HorizontalSliderProps {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({title, movies}: HorizontalSliderProps) => {
  return (
    <View
      style={{
        ...styles.flatListContainer,
        height: title ? 260 : 220,
      }}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MovieCard
            movie={item}
            height={200}
            width={140}
            marginHorizontal={8}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
