import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { Movie } from "../types/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieItem from "../components/movies/MovieItem";

function Favorite(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getFavorites = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }

      setMovies(favMovieList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [movies]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>Favorite</Text>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  row: {
    justifyContent: 'center',
    padding: 6,
  },
});

export default Favorite;