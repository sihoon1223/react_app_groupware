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
import Get from '../module/Get';
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
    Icon.loadFont();
    this.state = {
      day: this.props.day,
      rooms: this.props.rooms,
      bookings: [],
      // roomsRefresh: false,
      bookingsRefresh: false,
      _setChangeDay: this.props._setChangeDay,
      number_increase: 0,
    };
    //console.log('room 에서 create', this.props.day);
    console.log('Room Constructor Create');
  }

  _dataFromChild = (dataType, datas) => {
    //console.log('이거 겟 한거', datas);
    this.setState({
      [`${dataType}`]: datas,
      [`${dataType}Refresh`]: true,
    });
    // console.log(',,', this.state.day, this.state.bookings);
  };

  _getRoomData = () => (
    <Get
      url="http://210.181.192.190:8080/api/rooms"
      dataFromChild={this._dataFromChild}
      dataType="rooms"
    />
  );

  // componentDidMount() {
  //   this.setState({
  //     bookingsRefresh: false,
  //   });
  //   this.state.bookingsRefresh = false;
  // }

  // componentWillMount() {
  //   this._getBookingData();
  // }

  _getBookingData = async () => {
    console.log('getBooking start');
    // console.log('dlrjajfalsdfjalsdf', this.state.day);
    // const response = await fetch(
    //   'http://210.181.192.190:8080/api/bookings/search?bookingDay=' +
    //     this.state.day,
    // )
    //   .then(jsondata => {
    //     return jsondata.json();
    //   })
    //   .then(data => {
    //     this.setState({bookings: data, bookingsRefresh: true});
    //     console.log('alksdjflakjsdfl;akjsdfl', this.state.bookings);
    //   });
    const response = await fetch(
      'http://210.181.192.190:8080/api/bookings/search?bookingDay=' +
        this.state.day,
    );
    const jsondata = await response.json();
    console.log('getBooking  setstate before');
    this.setState({bookings: jsondata, bookingsRefresh: true});
    console.log('getBooking setstate after');
    //const responseJson = await response.json();

    // console.log(responseJson);
    // this._dataFromChild('bookings', responseJson);

    // <Get
    //   url={
    //     'http://210.181.192.190:8080/api/bookings/search?bookingDay=' +
    //     this.state.day
    //   }
    //   dataFromChild={this._dataFromChild}
    //   dataType="bookings"
    // />
  };

  _clickArrowButton = value => {
    //console.log('123124123123124', this.state.bookingsRefresh);
    //this.setState({bookingsRefresh: false});
    const today = this.state.day;
    const tempday = new Date(today);
    console.log(this.state.day);
    tempday.setDate(tempday.getDate() + value);

    //console.log(tempday.toISOString().substr(0, 10));
    //this.state._setChangeDay(tempday.toISOString().substr(0, 10));

    // this.setState({
    //   day: tempday.toISOString().substr(0, 10),
    // });

    this.state.day = tempday.toISOString().substr(0, 10);
    console.log(this.state.day);
    console.log('getBooking before');
    this._getBookingData();
    console.log('getBooking after');
    //console.log('함수 부른거 맞음?');
    //console.log(this.state.bookings);
  };

  componentDidMount() {
    // console.log('room - didmount');
    this._getBookingData();
  }
  // componentDidUpdate() {
  //   this._getBookingData();
  // }

  render() {
    console.log('room - render');

    console.log(this.state.bookings);
    //this._getBookingData();

    const {rooms, bookings, roomsRefresh, bookingsRefresh} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.day_header}>
          <Icon
            name="md-arrow-dropleft"
            style={{fontSize: 25, marginRight: 5}}
            onPress={() => this._clickArrowButton(-1)}
          />
          <Text style={{fontWeight: 'bold'}}>{this.state.day}</Text>
          <Icon
            name="md-arrow-dropright"
            style={{fontSize: 25, marginLeft: 5}}
            onPress={() => this._clickArrowButton(1)}
          />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.room_header}>
            <View style={styles.empty_container} />
            {/* {this._getRoomData()} */}
            {rooms ? (
              rooms.map((item, key) => {
                return (
                  <View style={styles.room_header_container} key={key}>
                    <View style={styles.room}>
                      <Text>{item.room_name}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Indicator />
            )}
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
                {/* {roomsRefresh && bookingsRefresh */}
                {bookingsRefresh ? (
                  rooms.map((item, key) => {
                    // this.state.number_increase += 1;
                    return (
                      <View style={styles.shedule}>
                        <TimeLine
                          //key={this.state.number_increase}
                          rooms={this.state.rooms}
                          roomName={item.room_name}
                          day={this.state.day}
                          navigation={this.props.navigation}
                          bookings={this.state.bookings}
                        />
                      </View>
                    );
                  })
                ) : (
                  <View style={{backgroundColor: 'blue'}}>
                    <ActivityIndicator size="large" color="gray" />
                  </View>
                )}
                {(this.state.bookingsRefresh = false)}
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
