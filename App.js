import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ProgressBarAndroid, StatusBar } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      skor: 0,
      rivalScore: 0,
      rakipHamle: null,
      hamle: null,
      userId: null,
      roomId: null,
      winner: null,
      inqueue: false,
      color: null,
    }
    this.socket = SocketIOClient('https://rockpaper.buraksakalli.org');
    this.socket.on('id', (id) => {
      this.setState({
        userId: id
      });
    });
    this.socket.on('result', (result) => {
      this.setState({ rakipHamle: result });
      this.winnerStatus(this.state.rakipHamle, this.state.hamle);
      this.newTurn();
    });

    this.socket.on('game-starting', (room) => {
      this.setState({
        roomId: room
      });
    });

    this.userSelection = this.userSelection.bind(this);
  }

  queue = () => {
    this.socket.emit('start-queue');
    this.setState({
      inqueue: true
    })
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
        winner: null,
        hamle: null
      })
    }, 5000);
  }

  winnerStatus = (rivalSelection, userSelection) => {
    if (userSelection == rivalSelection) this.setState({ winner: 'draw' });
    if (userSelection == 'rock' && rivalSelection == 'paper') this.setState({ winner: 'rival', rivalScore: this.state.rivalScore + 1 });
    if (userSelection == 'rock' && rivalSelection == 'scissors') this.setState({ winner: 'player', skor: this.state.skor + 1 });
    if (userSelection == 'paper' && rivalSelection == 'scissors') this.setState({ winner: 'rival', rivalScore: this.state.rivalScore + 1 });
    if (userSelection == 'paper' && rivalSelection == 'rock') this.setState({ winner: 'player', skor: this.state.skor + 1 });
    if (userSelection == 'scissors' && rivalSelection == 'rock') this.setState({ winner: 'rival', rivalScore: this.state.rivalScore + 1 });
    if (userSelection == 'scissors' && rivalSelection == 'paper') this.setState({ winner: 'player', skor: this.state.skor + 1 });
  }

  render() {
    const color = this.state.winner == 'draw' ? '#aeaeae' : this.state.winner == 'player' ? '#6fcf97' : '#eb5757';
    if (!this.state.roomId) {
      return (
        <View style={{ flex: 1, backgroundColor: '#181818', justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar backgroundColor="#181818" barStyle="light-content" />
          {
            this.state.inqueue
              ?
              <View>
                <ProgressBarAndroid />
                <Text style={{ color: '#aeaeae' }}>Sıraya katıldınız...</Text>
              </View>
              :
              <TouchableOpacity onPress={this.queue} style={{ backgroundColor: '#282828', paddingVertical: 20, paddingHorizontal: 50 }}>
                <Text style={{ color: '#aeaeae' }}>Sıraya Katıl {this.state.queue}</Text>
              </TouchableOpacity>
          }
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#181818' }}>
          <StatusBar backgroundColor="#181818" barStyle="light-content" />
          <View style={{ flex: 2, }}>
            {/* Scoreboard */}
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>You</Text>
              <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>{this.state.skor} : {this.state.rivalScore}</Text>
              <Text style={{ color: 'white' }}>Rival</Text>
            </View>
          </View>
          <View style={{ flex: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color, fontSize: 24, fontWeight: 'bold' }}>
              {
                this.state.winner &&
                  this.state.winner == 'player' ? 'You Win' : this.state.winner == 'rival' ? 'You defeat' : this.state.winner == 'draw' ? 'Draw' : ''
              }
            </Text>
            {
              this.state.winner &&
              <Text style={{ fontSize: 16, color: '#aeaeae' }}>You picked {this.state.hamle}, rival picked {this.state.rakipHamle}</Text>
            }
          </View>
          <View style={{ flex: 2, }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, }}>
              <TouchableOpacity disabled={(this.state.hamle)} onPress={() => { this.userSelection('rock') }}>
                <Image resizeMode='contain' style={{ height: 70 }} source={require('./src/rock.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity disabled={(this.state.hamle)} onPress={() => { this.userSelection('paper') }}>
                <Image resizeMode='contain' style={{ height: 70 }} source={require('./src/paper.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity disabled={(this.state.hamle)} onPress={() => { this.userSelection('scissors') }}>
                <Image resizeMode='contain' style={{ height: 70 }} source={require('./src/scissors.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
}
