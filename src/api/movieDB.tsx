import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'ed9f4e27816b8a36fc74b27be9279e03',
    language: 'es-ES',
  },
});

export default movieDB;
