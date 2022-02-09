/* eslint-disable*/
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';

import {Cast} from '../interfaces/creditsInterface';
import {MovieFullResponse} from '../interfaces/movieInterface';
import {CastItem} from './CastItem';

interface MovieDetailsProps {
  movieFull: MovieFullResponse;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: MovieDetailsProps) => {
  return (
    <>
      {/*Details*/}
      <View style={styles.detailsContainer}>
        <View style={styles.stars}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text>{movieFull.vote_average}</Text>
          <Text style={styles.genres}>
            - { movieFull.genres.map(genre => genre.name).join(', ') }
          </Text>
        </View>
        <Text style={styles.sectionTitle}>
          Historia
        </Text>
        <Text style={styles.text}>{movieFull.overview}</Text>
        {
          movieFull.budget > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                Presupuesto
              </Text>
              <Text style={styles.text}>
                {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
              </Text>
            </>
          )
        }
      </View>

      {/*Cast*/}
      <View style={styles.castContainer}>
        <Text style={{ ...styles.sectionTitle, marginHorizontal: 20 }}>Actores</Text>
        <FlatList
          style={styles.flatList}
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CastItem actor={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  castContainer: {
    marginBottom: 100,
  },
  stars: {
    flexDirection: 'row',
  },
  genres: {
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 23,
    marginTop: 15,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
  },
  flatList: {
    marginTop: 10,
    height: 70,
  }
});
