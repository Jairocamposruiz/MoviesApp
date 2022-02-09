/* eslint-disable*/
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieDetails} from '../components/MovieDetails';

import {useMovieDetails} from '../hooks/useMovieDetails';
import {RootStackParams} from '../navigation/Navigation';

const screenHeight = Dimensions.get('screen').height;

interface DetailScreenProps extends StackScreenProps<RootStackParams,'DetailScreen'>{};

export const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image style={styles.imagePoster} source={{ uri }} />
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {
        isLoading
          ? <ActivityIndicator style={styles.loading} size={35} color="grey"/>
          : <MovieDetails movieFull={movieFull!} cast={cast} />
      }
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('HomeScreen')}>
        <Icon style={styles.backButton} name="arrow-back-outline" color="white" size={60} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imagePoster: {
    flex: 1
  },
  containerText: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
  backButton: {
    bottom: 2,
    left: 1
  },
  buttonContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 50,
    zIndex: 9,
    elevation: 99,
    top: 30,
    left: 10,
    width: 60,
    height: 60
  }
})
