import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from '../components/movies/MovieItem';
import type { Movie } from '../types/app';

const CategorySearchResult = ({ route }: any): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { genreId } = route.params;

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={{ width: 115, height: 170 }}
            coverType="poster"
          />
        )}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    justifyContent: 'center',
    marginBottom: 15,
  },
});

export default CategorySearchResult;
