import React from 'react';

import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Room from '../component/Room';
import LoadingScreen from './LoadingScreen';
import {ThemeConsumer} from 'react-native-elements';
export default class BookingResourceScreen2 extends React.Component {
  constructor(props) {
    super(props);
    //console.log('BRS2 - constructor');
    this.state = {
      day: this.props.navigation.state.params.day.dateString,
      rooms: [],
      isExistData: false,
    };
  }

  componentDidMount() {
    //console.log('BRS2 - componentDidMount');
    this._getRooms();
  }

  render() {
    const {isExistData, day, rooms} = this.state;
    //console.log('BRS2 - render');

    return (
      <View style={styles.container}>
        {isExistData ? (
          <Room day={day} rooms={rooms} navigation={this.props.navigation} />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="gray" />
          </View>
        )}
      </View>
    );
  }

  _getRooms = async () => {
    //console.log('BRS2 - _getRooms');
    const response = await fetch('http://210.181.192.190:8080/api/rooms');
    const json = await response.json();
    this.setState({
      rooms: json,
      isExistData: true,
    });
    this.props.navigation.setParams({
      rooms: this.state.rooms,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
