import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/app';
import { API_ACCESS_TOKEN } from '@env';
import type { Genre } from '../../types/app';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CategorySearchResult'
>;

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchGenres = async () => {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
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
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = () => {
    if (selectedGenre) {
      navigation.navigate('CategorySearchResult', {
        genreId: selectedGenre.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={{
              ...styles.genreButton,
              backgroundColor:
                selectedGenre?.id === item.id ? '#8978A4' : '#C0B4D5',
            }}
            onPress={() => setSelectedGenre(item)}
          >
            <Text style={styles.genreLabel}>{item.name}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  genreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    height: 50,
    marginHorizontal: 8,
  },
  genreLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#8978A4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    marginVertical: 16,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});

export default CategorySearch;
