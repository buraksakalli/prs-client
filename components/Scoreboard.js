import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
    alignItems: 'center',
  },
  player: {
    color: 'white',
  },
  score: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default class Scoreboard extends Component {
  render() {
    const {score, rivalScore} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.player}>You</Text>
        <Text style={styles.score}>
          {score} : {rivalScore}
        </Text>
        <Text style={styles.player}>Rival</Text>
      </View>
    );
  }
}
