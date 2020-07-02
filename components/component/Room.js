import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TimeLine from '../component/TimeLine';
import Icon from 'react-native-vector-icons/Ionicons';
import Indicator from '../component/WaitIndicator';

const tableHead = [
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

export default class Room extends Component {
  constructor(props) {
    super(props);
    //console.log('Room - constructor');
    Icon.loadFont();
    this.state = {
      day: this.props.day,
      rooms: this.props.rooms,
      bookings: [],
      booking
      isExistData: false,
    };
    //console.log('room 에서 create', this.props.day);
    console.log('Room Constructor Create');
  }

  componentDidMount() {
    //console.log('Room - componentDidMount');
    this._getBookings();

    this.focusListener = [
      this.props.navigation.addListener('didFocus', () => {
        this._getBookings();
      }),
    ];
  }

  componentWillUnmount() {
    //console.log('Room - componentWillUnMount', this.focusListener);
    this.focusListener.forEach(item => item.remove());
  }

  _getBookings = async () => {
    //console.log('Room - _getBookings');
    const day = this.state.day;
    const response = await fetch(
      'http://210.181.192.190:8080/api/bookings/search?bookingDay=' + day,
    );
    const json = await response.json();
    this.setState({
      bookings: json,
      isExistData: true,
    });
  };

  render() {
    const {rooms, bookings, isExistData, day} = this.state;
    // console.log('Room - render');
    // console.log('bookings:', bookings);
    return (
      <View style={styles.container}>
        <View style={styles.day_header}>
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              console.log('clicked');
              this.setState({
                day: '2020-07-04',
              });
            }}>
            {day}
          </Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.room_header}>
            <View style={styles.empty_container} />
            {rooms.map((item, key) => {
              return (
                <View style={styles.room_header_container} key={key}>
                  <View style={styles.room}>
                    <Text>{item.room_name}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <ScrollView horizontal>
            <View style={styles.main_container}>
              <View style={styles.time_header}>
                {tableHead.map((item, key) => {
                  return (
                    <View style={styles.time}>
                      <Text>{item}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.shedule_container}>
                {isExistData
                  ? rooms.map((item, key) => {
                      return (
                        <View style={styles.shedule} key={key}>
                          <TimeLine
                            rooms={rooms}
                            bookings={bookings}
                            roomName={item.room_name}
                            day={day}
                            navigation={this.props.navigation}
                          />
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fcfcfc',
  },
  day_header: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  day: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  empty_container: {
    borderTopWidth: 0.5,
    borderTopColor: '#cdcdcd',
    backgroundColor: '#eeeeee',
    borderRightWidth: 0.5,
    borderRightColor: '#cdcdcd',
    width: wp('12%'),
    height: hp('5%'),
  },
  time_header: {
    width: wp('260%'),
    flexDirection: 'row',
  },
  time: {
    backgroundColor: '#eeeeee',
    width: 2 * wp('10%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#cdcdcd',
    borderTopWidth: 0.5,
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderRightColor: '#cdcdcd',
  },
  room_header: {
    width: wp('12%'),
    flexDirection: 'column',
  },
  room_header_container: {
    flexDirection: 'row',
    backgroundColor: '#fcfcfc',
    borderTopColor: '#cdcdcd',
    borderTopWidth: 0.5,
    flex: 1,
  },
  room: {
    borderRightColor: '#cdcdcd',
    borderRightWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('12%'),
    backgroundColor: '#eeeeee',
  },
  main_container: {
    flexDirection: 'column',
    flex: 1,
    width: wp('260%'),
  },
  shedule_container: {
    width: wp('260%'),
    flex: 1,
  },
  shedule: {
    flex: 1,
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
});
