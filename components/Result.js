import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Result extends Component {
  render() {
    const {winner, selection, rivalSelection} = this.props;
    const color =
      winner === 'draw'
        ? '#aeaeae'
        : winner === 'player'
        ? '#6fcf97'
        : '#eb5757';
    const styles = StyleSheet.create({
      container: {
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      roundStatus: {
        color: color,
        fontSize: 24,
        fontWeight: 'bold',
      },
      score: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 16,
        color: '#aeaeae',
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.roundStatus}>
          {winner && winner === 'player'
            ? 'You Win'
            : winner === 'rival'
            ? 'You defeat'
            : winner === 'draw'
            ? 'Draw'
            : ''}
        </Text>
        {winner && (
          <Text style={styles.description}>
            You picked {selection}, rival picked {rivalSelection}
          </Text>
        )}
      </View>
    );
  }
}
