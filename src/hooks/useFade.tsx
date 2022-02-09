/* eslint-disable*/
import {useRef} from 'react';
import {Animated} from 'react-native';

export const useFade = (initialValue = 0) => {
  const opacity = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (duration = 300, callback?: Function) => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }
    ).start(() => callback? callback() : null);
  };

  const fadeOut = (duration = 300) => {
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }
    ).start();
  }

  return { opacity, fadeIn, fadeOut };
}
