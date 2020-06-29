import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Get from '../module/Get';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: this.props.day,
      roomName: this.props.roomName,
      timedata: [],
      bookingDatas: [],
      isModalVisible: false,
    };

    for (let i = 0; i < 26; i++) {
      this.state.timedata.push({
        check: false,
        day: '',
        roomName: '',
        start: '',
        end: '',
        name: '',
        id: i,
        description: '',
        isStart: false,
      });
    }
  }

  _checkRoomName = data => {
    if (this.state.roomName !== data.roomName) {
      return false;
    }
    return true;
  };

  _settingScheduleBlock = () => {
    const newTimeData = this.state.timedata; // 복사

    this.state.bookingDatas.map((data, index) => {
      if (this._checkRoomName(data)) {
        var startTime = data.startTime.split(':');
        var endTime = data.endTime.split(':');
        startTime[0] = (startTime[0] - 9) * 2;
        endTime[0] = (endTime[0] - 9) * 2;
        if (endTime[1] - 30 == 0) {
          endTime[0] += 1;
        }
        if (startTime[1] - 30 == 0) {
          startTime[0] += 1;
        }

        //newTimeData에 데이터 (스케쥴) 집어넣기

        for (let i = startTime[0]; i < endTime[0]; i++) {
          if (i === startTime[0]) {
            newTimeData[i] = {
              check: true,
              day: data.bookingDay,
              roomName: data.roomName,
              start: data.startTime,
              end: data.endTime,
              description: data.description,
              name: data.reservedName,
              isStart: true,
              id: this.state.timedata[i].id,
              size: endTime[0] - startTime[0],
            };
          } else {
            newTimeData[i] = {
              check: true,
              day: data.bookingDay,
              roomName: data.roomName,
              start: data.startTime,
              end: data.endTime,
              name: data.reservedName,
              description: data.description,
              id: this.state.timedata[i].id,
              isStart: false,
              size: '',
            };

            //rerender를 위해 기존 state.timedata를 newTimeData로 바꿔넣기
            this.setState({
              timedata: newTimeData,
            });
          }
        }
      }
    });
  };

  _toggleModal = () => {
    this.state.isModalVisible
      ? this.setState({
          isModalVisible: false,
          isEditDescription: false,
        })
      : this.setState({
          isModalVisible: true,
        });
  };
  _dataFromChild = datas => {
    this.setState({bookingDatas: datas});
    this._settingScheduleBlock();
  };

  render() {
    const {timedata, today} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {/* 스케쥴이 있을 경우 */}
          <Get
            url={
              'http://210.181.192.190:8080/api/bookings/search?bookingDay=' +
              today
            }
            dataFromChild={this._dataFromChild}
          />
          {timedata.map((rowdata, index) => {
            return rowdata.check ? (
              rowdata.isStart ? (
                <View>
                  <TouchableOpacity
                    onPress={this._toggleModal}
                    key={index}
                    style={[
                      styles.scheduleblock,
                      {width: rowdata.size * wp('10%')},
                    ]}>
                    <Text>
                      {rowdata.start +
                        '~' +
                        rowdata.end +
                        ' ' +
                        rowdata.description +
                        ' (' +
                        rowdata.name +
                        ')'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            ) : (
              <View>
                <TouchableOpacity
                  key={index}
                  style={styles.timeblock}
                  //onLongPress={() => console.log('꾹누름 드래그옵션')}
                  onPress={() =>
                    this.props.navigation.navigate('Booking_step3', {
                      navigation: this.props.navigation,
                      day: this.props.day,
                      roomName: this.state.roomName,
                      startTime: rowdata.id,
                      // _setIsRefreshing: this.props._setIsRefreshing,
                    })
                  }>
                  {/* <Text>{rowdata.id}</Text> */}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={this._toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('260%'),
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeblock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#cdcdcd',
    width: wp('10%'),
  },
  scheduleblock: {
    flex: 1,
    // zIndex: 10,
    overflow: 'hidden',
    backgroundColor: 'pink',
    borderRightWidth: 0.5,
    borderRightColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
  },
  modalView: {
    alignSelf: 'center',
    backgroundColor: '#fcfcfc',
    shadowColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    width: wp('70%'),
    height: 150,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
