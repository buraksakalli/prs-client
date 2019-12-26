import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ProgressBarAndroid,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#aeaeae',
  },
  joinButton: {
    backgroundColor: '#282828',
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  progressBar: {
    margin: 24,
    color: '#aeaeae',
  },
});

export default class Queue extends Component {
  render() {
    const {waiting} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#181818" barStyle="light-content" />
        {waiting ? (
          <View>
            <ProgressBarAndroid style={styles.progressBar} />
            <Text style={styles.text}>Rakip oyuncu bekleniyor...</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={this.props.joinButtonPressed}
            style={styles.joinButton}>
            <Text style={styles.text}>Sıraya Katıl</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
