/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

function MovieDetail({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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