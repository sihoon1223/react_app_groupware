import React from 'react';

import {StyleSheet, View} from 'react-native';
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

    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    console.log('render');
    return (
      <View style={styles.container}>
        {this._getRoomData()}
        {this.state.isLoading ? (
          <Room
            day={this.state.day}
            rooms={this.state.rooms}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }

  _dataFromChild = (dataType, datas) => {
    console.log('_dataFromChild');
    this.setState({
      [`${dataType}`]: datas,
      isLoading: true,
    });

    this.props.navigation.setParams({
      rooms: this.state.rooms,
    });
  };

  _getRoomData = () => {
    return (
      <Get
        url="http://210.181.192.190:8080/api/rooms"
        dataFromChild={this._dataFromChild}
        dataType="rooms"
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
