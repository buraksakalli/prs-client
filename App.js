import React, { Component } from 'react'
import { View, Text, Dimensions, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      skor: null,
      rakipHamle: null,
      hamle: null,
      userId: null,
      roomId: null,
      winner: null
    }
    this.socket = SocketIOClient('http://192.168.1.33:3000');
    this.socket.on('id', (id) => {
      this.setState({
        userId: id
      });
    });
    this.socket.on('result', (result) => {
      this.setState({ rakipHamle: result });
      this.winnerStatus(this.state.rakipHamle, this.state.hamle);
      this.newTurn();
    })
    this.userSelection = this.userSelection.bind(this);
  }

  queue = () => {
    this.socket.emit('start-queue');
    this.socket.on('game-starting', (room) => {
      this.setState({
        roomId: room
      });
    });
  }

  userSelection = (selection) => {
    if (selection != null) {
      console.log(selection);
      this.setState({ hamle: selection })
      this.socket.emit('selected-card', { roomid: this.state.roomId, userid: this.state.userId, selection: selection });
    }
  }

  newTurn = () => {
    setTimeout(() => {
      this.setState({
        rakipHamle: null,
        winner: null
      })
    }, 5000);
  }

  winnerStatus = (rivalSelection, userSelection) => {
    if (userSelection == rivalSelection) this.setState({ winner: 'draw' });
    if (userSelection == 'rock' && rivalSelection == 'paper') this.setState({ winner: 'rival' });
    if (userSelection == 'rock' && rivalSelection == 'scissors') this.setState({ winner: 'player' });
    if (userSelection == 'paper' && rivalSelection == 'scissors') this.setState({ winner: 'rival' });
    if (userSelection == 'paper' && rivalSelection == 'rock') this.setState({ winner: 'player' });
    if (userSelection == 'scissors' && rivalSelection == 'rock') this.setState({ winner: 'rival' });
    if (userSelection == 'scissors' && rivalSelection == 'paper') this.setState({ winner: 'player' });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: '#282828', }}>
          {/* Scoreboard */}
          <Text style={{ color: 'white', marginLeft: 15, marginTop: 15 }}>Skorun: {this.state.userId} </Text>
        </View>
        <View style={{ flex: 6, backgroundColor: '#353535' }}>
          <Text>{this.state.rakipHamle}</Text>
          <Text>{this.state.winner}</Text>
        </View>
        <View style={{ flex: 2, backgroundColor: '#282828' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Button title="Queue" onPress={this.queue}></Button>
            <Button title="Rock" onPress={() => { this.userSelection('rock') }}></Button>
            <Button title="Paper" onPress={() => { this.userSelection('paper') }}></Button>
            <Button title="Scissors" onPress={() => { this.userSelection('scissors') }}></Button>
          </View>
        </View>
      </View>
    )
  }
}
