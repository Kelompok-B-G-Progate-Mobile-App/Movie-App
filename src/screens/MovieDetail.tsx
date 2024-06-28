/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Movie } from '../types/app';
import { API_ACCESS_TOKEN } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieList from '../components/movies/MovieList';

function MovieDetail({ route }: any): JSX.Element {
  const [detailMovie, setDetailMovie] = useState<Movie>();
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }
      if (favMovieList.some((item) => id === item.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      let initialData: string | null = await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      let initialData: string | null = await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }
      const newMovieList = favMovieList.filter((item) => item.id !== id);
      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(newMovieList));
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = route.params;

  useEffect(() => {
    getDetailMovie();
  }, []);

  useEffect(() => {
    if (detailMovie) {
      checkFavorite(detailMovie.id);
    }
  }, [detailMovie]);

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
            <TouchableOpacity
              onPress={() => {
                if (detailMovie) {
                  if (isFavorite) {
                    removeFavorite(detailMovie.id);
                  } else {
                    addFavorite(detailMovie);
                  }
                }
              }}
              style={styles.favoriteIcon}
            >
              <FontAwesome 
                name={isFavorite ? "heart" : "heart-o"}
                size={25}
                color="red"
              />
            </TouchableOpacity>
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
        <MovieList
          title={"Recommendations"}
          path={`movie/${id}/recommendations`}
          coverType={"poster"}
        />
      </View>
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
    position: 'relative',
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
  favoriteIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default MovieDetail;
