import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import SocketIOClient from 'socket.io-client';
import Queue from './components/Queue';
import Scoreboard from './components/Scoreboard';
import Result from './components/Result';
import SelectionButtons from './components/SelectionButtons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      rivalScore: 0,
      rivalSelection: null,
      selection: null,
      userId: null,
      roomId: null,
      winner: null,
      isJoinedQueue: false,
    };
    this.socket = SocketIOClient('http://192.168.2.113:3000');
    this.socket.on('id', id => {
      this.setState({
        userId: id,
      });
    });
    this.socket.on('result', result => {
      this.setState({rivalSelection: result});
      this.getWinner(this.state.rivalSelection, this.state.selection);
      this.newTurn();
    });
    this.socket.on('game-starting', room => {
      this.setState({
        roomId: room,
      });
    });
    this.socket.on('you-are-disconnected', () => {
      alert('you-are-disconnected');
      this.setState({
        score: 0,
        rivalScore: 0,
        rivalSelection: null,
        selection: null,
        roomId: null,
        winner: null,
        isJoinedQueue: false,
      });
    });
    this.socket.on('rival-disconnected', () => {
      alert('rival-disconnected');
      this.setState({
        score: 0,
        rivalScore: 0,
        rivalSelection: null,
        selection: null,
        roomId: null,
        winner: null,
        isJoinedQueue: false,
      });
    });
  }

  joinQueue = () => {
    this.socket.emit('start-queue');
    this.setState({
      isJoinedQueue: true,
    });
  };

  userSelection = selection => {
    this.setState({selection: selection});
    this.socket.emit('selected-card', {
      roomid: this.state.roomId,
      userid: this.state.userId,
      selection: selection,
    });
  };

  newTurn = () => {
    setTimeout(() => {
      this.setState({
        rivalSelection: null,
        winner: null,
        selection: null,
      });
    }, 3000);
  };

  getWinner = (rivalSelection, userSelection) => {
    if (userSelection === rivalSelection) {
      this.setState({winner: 'draw'});
    }
    if (userSelection === 'rock' && rivalSelection === 'paper') {
      this.setState({winner: 'rival', rivalScore: this.state.rivalScore + 1});
    }
    if (userSelection === 'rock' && rivalSelection === 'scissors') {
      this.setState({winner: 'player', score: this.state.score + 1});
    }
    if (userSelection === 'paper' && rivalSelection === 'scissors') {
      this.setState({winner: 'rival', rivalScore: this.state.rivalScore + 1});
    }
    if (userSelection === 'paper' && rivalSelection === 'rock') {
      this.setState({winner: 'player', score: this.state.score + 1});
    }
    if (userSelection === 'scissors' && rivalSelection === 'rock') {
      this.setState({winner: 'rival', rivalScore: this.state.rivalScore + 1});
    }
    if (userSelection === 'scissors' && rivalSelection === 'paper') {
      this.setState({winner: 'player', score: this.state.score + 1});
    }
  };

  render() {
    const waiting = Boolean(this.state.isJoinedQueue);
    const disabled = Boolean(this.state.selection);
    const isGameStarted = Boolean(!this.state.roomId);
    if (isGameStarted) {
      return <Queue joinButtonPressed={this.joinQueue} waiting={waiting} />;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#181818" barStyle="light-content" />
          <Scoreboard
            score={this.state.score}
            rivalScore={this.state.rivalScore}
          />
          <Result
            winner={this.state.winner}
            selection={this.state.selection}
            rivalSelection={this.state.rivalSelection}
          />
          <SelectionButtons
            onSelected={this.userSelection}
            disabled={disabled}
          />
        </View>
      );
    }
  }
}
