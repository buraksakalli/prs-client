import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 70,
  },
});

export default class SelectionButtons extends Component {
  render() {
    const {onSelected, disabled} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            onSelected('rock');
          }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../src/rock.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            onSelected('paper');
          }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../src/paper.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            onSelected('scissors');
          }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../src/scissors.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
