import { useLocalSearchParams } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class index extends Component {
  render() {
    const {slag} = useLocalSearchParams<{slag : string}>()
    return (
      <View>
        <Text> This is the profile pages of {slag} </Text>
      </View>
    )
  }
}
