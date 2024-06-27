/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Movie, MovieListProps } from '../types/app';
import { API_ACCESS_TOKEN } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MovieList from '../components/movies/MovieList';

function MovieDetail({ route }: any): JSX.Element {
  const { id } = route.params;
  const [detailMovie, setDetailMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getDetailMovie();
  }, []);

  const getDetailMovie = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setDetailMovie(data);
      });
  };

  // console.log(detailMovie);
  const recomendations: MovieListProps = {
    title: 'Recomendations',
    path: `/movie/${id}/recommendations`,
    coverType: 'poster',
  };
  if (!detailMovie) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {detailMovie.backdrop_path ? (
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${detailMovie.backdrop_path}`,
          }}
          style={styles.containerImage}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradient}
          >
            <Text style={styles.titleMovie}>{detailMovie.title}</Text>
            <View style={styles.containerRating}>
              <FontAwesome name="star" size={14} color="yellow" />
              <Text style={styles.rating}>
                {detailMovie.vote_average.toFixed(1)}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={styles.containerNoImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <View style={styles.containerMovieDetails}>
        <Text style={styles.overview}>{detailMovie.overview}</Text>
        <View style={styles.rowInfoDetail}>
          <View style={styles.columnInfoDetail}>
            <Text style={styles.labelInfo}>Original Language</Text>
            <Text style={styles.valueInfo}>
              {detailMovie.original_language}
            </Text>
          </View>
          <View style={styles.columnInfoDetail}>
            <Text style={styles.labelInfo}>Popularity</Text>
            <Text style={styles.valueInfo}>{detailMovie.popularity}</Text>
          </View>
        </View>
        <View style={styles.rowInfoDetail}>
          <View style={styles.columnInfoDetail}>
            <Text style={styles.labelInfo}>Release Date</Text>
            <Text style={styles.valueInfo}>
              {new Date(detailMovie.release_date).toDateString()}
            </Text>
          </View>
          <View style={styles.columnInfoDetail}>
            <Text style={styles.labelInfo}>Vote Count</Text>
            <Text style={styles.valueInfo}>{detailMovie.vote_count}</Text>
          </View>
        </View>
      </View>
      {/* List Rekomendasi Movie */}
      <MovieList
        title={recomendations.title}
        path={recomendations.path}
        coverType={recomendations.coverType}
        key={recomendations.title}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    width: '100%',
    height: 220,
  },
  gradient: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: 220,
    padding: 8,
    borderRadius: 8,
  },
  titleMovie: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  containerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  containerNoImage: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  noImageText: {
    color: '#888',
  },
  containerMovieDetails: {
    padding: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  rowInfoDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnInfoDetail: {
    flex: 1,
    paddingHorizontal: 5,
  },
  labelInfo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  valueInfo: {
    fontSize: 14,
  },
});

export default MovieDetail;
