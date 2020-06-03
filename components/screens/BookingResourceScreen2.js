import React from 'react';

import {StyleSheet, View, Text, Button, InteractionManager} from 'react-native';
import Room from '../component/Room';
//import Ionicons from "react-native-vector-icons/Ionicons";

const BookingContext = React.createContext();

export const BookingContextProvider = BookingContext.Provider;
export const BookingContextConsumer = BookingContext.Consumer;
export default class BookingResourceScreen2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  render() {
    console.log('refresh');
    const day = this.props.navigation.state.params.day.dateString;
    return (
      <View style={styles.container}>
        <Room day={day} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
