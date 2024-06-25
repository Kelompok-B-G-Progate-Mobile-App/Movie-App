/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ACCESS_TOKEN, API_URL } from '@env'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

function MovieDetail({ navigation }: any): any {
  const fetchData = (): void => {
    if (API_ACCESS_TOKEN == null || URL == null) {
      throw new Error('ENV not found')
    }

    const options: {
      method: string
      headers: { accept: string; Authorization: string }
    } = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(API_URL, options)
      .then(async (response) => await response.json())
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Fetch Data" onPress={() => fetchData()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MovieDetail