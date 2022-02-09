/* eslint-disable*/
import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {MovieCard} from '../components/MovieCard';
import {GradientContext} from '../context/GradientContext';
import {getColors} from '../helpers/getColors';
import {useMovies} from '../hooks/useMovies';

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {width: windowWidth} = useWindowDimensions();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    const [primary = 'white', secondary = 'white'] = await getColors(uri);

    setMainColors({primary, secondary});
  }

  useEffect(() => {
    if(nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying])

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="tomato" size={100} />
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={styles.carouseContainer}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MovieCard movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={windowWidth * 0.76}
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index) => getPosterColors(index)} //La imagen que se muestra actualmente
            />
          </View>
          <HorizontalSlider movies={nowPlaying} title="In cinema" />
          <HorizontalSlider movies={popular} title="Popular" />
          <HorizontalSlider movies={topRated} title="Top" />
          <HorizontalSlider movies={upcoming} title="Upcoming" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouseContainer: {
    height: 450,
    display: 'flex',
    paddingTop: 10,
  },
})
