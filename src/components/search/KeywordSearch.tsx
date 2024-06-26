import React, { useState } from 'react'
import { TextInput, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import type { Movie } from '../../types/app'
import MovieItem from '../../components/movies/MovieItem'
import { Ionicons } from '@expo/vector-icons'

const KeywordSearch = (): JSX.Element => {
    const [keyword, setKeyword] = useState<string>('')
    const [movies, setMovies] = useState<Movie[]>([])

    const handleSearch = () => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        }

        fetch(url, options)
            .then(async (response) => await response.json())
            .then((response) => {
                console.log(response)
                setMovies(response.results)
            })
            .catch((err) => console.error(err))
    }

    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Input title movie here"
                    value={keyword}
                    onChangeText={setKeyword}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <MovieItem
                        movie={item}
                        size={{ width: 125, height: 180 }}
                        coverType="poster"
                    />
                )}
                columnWrapperStyle={styles.row}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginVertical: 16,
        borderRadius: 4,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#8978A4',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 12,
    },
    searchButton: {
        padding: 5,
    },
})

export default KeywordSearch