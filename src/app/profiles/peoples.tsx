import { Link } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class peoples extends Component {
    render() {
        return (
            <View>
                <Text> This is all the name of Peoples </Text>
                <Link href={{
                    pathname: '/profiles/[slag]',
                    params: { slag: 'bacon' }
                }}>Click</Link>
            </View>
        )
    }
}
