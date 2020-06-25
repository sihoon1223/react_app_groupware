import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Get from '../module/Get';
import TimeLine from '../component/TimeLine';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
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
      ],
      room: '',
    };
  }
  //get 모듈을 통해 가져온 데이터를 스테이트에 세팅
  _dataFromChild = datas => {
    /*
    TODO: this.setState와 this.state.example = 'example' 의 차이가 무엇인지 명확하게 알기
    */
    this.setState({room: datas});
  };
  render() {
    const room = this.state.room;

    return (
      <View style={styles.container}>
        <View style={styles.day_header}>
          <Text style={styles.day}>{this.props.day}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fcfcfc',
          }}>
          <View style={styles.room_header}>
            <View style={styles.empty_container} />
            <Get
              url="http://210.181.192.190:8080/api/rooms"
              dataFromChild={this._dataFromChild}
            />
            {room
              ? room.map((item, key) => {
                  return (
                    <View style={styles.room_header_container} key={key}>
                      <View style={styles.room}>
                        <Text>{item.room_name}</Text>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
          <ScrollView horizontal>
            <View style={styles.main_container}>
              <View style={styles.time_header}>
                {this.state.tableHead.map((item, key) => {
                  return (
                    <View style={styles.time}>
                      <Text>{item}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.shedule_container}>
                {room
                  ? room.map((item, key) => {
                      return (
                        <View style={styles.shedule} key={key}>
                          <TimeLine
                            roomName={item.room_name}
                            day={this.props.day}
                            navigation={this.props.navigation}
                            //_setIsRefreshing={this.props._setIsRefreshing}
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
  day_header: {
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
