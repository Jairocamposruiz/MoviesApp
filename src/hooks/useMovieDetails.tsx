/* eslint-disable*/

import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Cast, MovieCreditsResponse} from '../interfaces/creditsInterface';
import {MovieFullResponse} from '../interfaces/movieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFullResponse;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFullResponse>(`/${movieId}`);
    const movieCreditsPromise = movieDB.get<MovieCreditsResponse>(`/${movieId}/credits`);

    const responses = await Promise.all([movieDetailsPromise, movieCreditsPromise]);

    setState({
      isLoading: false,
      movieFull: responses[0].data,
      cast: responses[1].data.cast,
    })
  }

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {...state};
}
