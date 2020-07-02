import React from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Room from '../component/Room';
import Get from '../module/Get';

export default class BookingResourceScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.navigation.state.params.day.dateString,
      rooms: [],
      isLoading: false,
    };
  }

  _setChangeDay = value => {
    // this.props.navigation.state.params.day.dateString = value;

    console.log('day change start');
    this.setState({
      day: value,
      change: value,
    });
    console.log('day change end');
    //this.state.day = value;
  };

  render() {
    console.log('bookingscreen - render', this.state.day);
    return (
      <View style={styles.container}>
        {this._getRoomData()}
        {this.state.isLoading ? (
          <Room
            _setChangeDay={this._setChangeDay}
            day={this.state.day}
            rooms={this.state.rooms}
            navigation={this.props.navigation}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    );
  }

  _dataFromChild = (dataType, datas) => {
    this.setState({
      [`${dataType}`]: datas,
      isLoading: true,
    });

    this.props.navigation.setParams({
      rooms: this.state.rooms,
    });
  };

  _getRoomData = () => (
    <Get
      url="http://210.181.192.190:8080/api/rooms"
      dataFromChild={this._dataFromChild}
      dataType="rooms"
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
