/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

function Home({ navigation }: any): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Movie Detail"
        onPress={() => navigation.navigate('MovieDetail')}
      />
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



export default Home