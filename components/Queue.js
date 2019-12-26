import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

export default class Queue extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{backgroundColor: '#282828', paddingVertical: 20, paddingHorizontal: 50}}>
          <Text style={{color: '#aeaeae'}}>Sıraya Katıl</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
