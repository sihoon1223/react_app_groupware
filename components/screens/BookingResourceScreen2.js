import React from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
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
      // null 부분에 데이터 불러올때 인디케이터를 띄운다던가,, 로딩뷰를 띄우기
      <View style={styles.container}>
        {isExistData ? (
          <Room day={day} rooms={rooms} navigation={this.props.navigation} />
        ) : null}
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
