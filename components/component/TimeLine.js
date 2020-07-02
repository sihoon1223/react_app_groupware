import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

const blockColor = [
  '#F0F8FF',
  '#FAEBD7',
  '#7FFFD4',
  '#F5F5DC',
  '#8A2BE2',
  '#5F9EA0',
  '#6495ED',
  '#FF7F50',
  '#D2691E',
  '#DC143C',
  '#A9A9A9',
  '#556B2F',
  '#BDB76B',
  '#FF8C00',
  '#9932CC',
  '#483D8B',
  '#00BFFF',
  '#E9967A',
  '#DCDCDC',
  '#FFFACD',
  '#FFB6C1',
  '#E6E6FA',
  '#FFF0F5',
];

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    //console.log('TimeLine(', this.state.roomName, ') - constructor');
    this.state = {
      today: this.props.day,
      roomName: this.props.roomName,
      rooms: this.props.rooms,
      bookings: this.props.bookings,
      timedata: [],
      isModalVisible: false,
      selectedBlockColor: '',
      isRefresh: false,
      selectedBlock: '',
    };

    this._clearTimeData();
  }

  componentDidMount() {
    //console.log('TimeLine - componentDidMount');
    this._settingTimeBlock();
  }

  _checkRoomName = data => {
    //console.log('TimeLine - _checkRoomName');
    if (this.state.roomName !== data.roomName) {
      return false;
    }
    return true;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('TimeLine - getDerivedStateFromProps');

    if (nextProps.bookings !== prevState.bookings) {
      return {
        bookings: nextProps.bookings,
        isRefresh: true,
      };
    } else {
      return {
        isRefresh: false,
      };
    }
  }

  _getRandomColor() {
    //console.log('TimeLine(', this.state.roomName, ') - _getRandomColor');
    var item = blockColor[Math.floor(Math.random() * blockColor.length)];
    this.state.selectedBlockColor = item;
  }

  _clearTimeData = () => {
    //console.log('_clearTimeData');
    const tempBlock = [];
    for (let i = 0; i < 26; i++) {
      tempBlock.push({
        check: false, //데이터의 유무 체크
        day: '',
        roomName: '',
        start: '',
        end: '',
        name: '',
        id: i,
        description: '',
        isStart: false, //데이터의 시작 블록 체크
        blockColor: '',
      });
    }

    this.state.timedata = tempBlock;
  };

  _settingTimeBlock = () => {
    //console.log('TimeLine(', this.state.roomName, ') - _settingTimeBlock');
    this._clearTimeData();

    const newTimeData = this.state.timedata; // 복사
    this.state.bookings.map((data, index) => {
      if (this._checkRoomName(data)) {
        var startTime = data.startTime.split(':');
        var endTime = data.endTime.split(':');
        startTime[0] = (startTime[0] - 9) * 2;
        endTime[0] = (endTime[0] - 9) * 2;
        if (endTime[1] - 30 === 0) {
          endTime[0] += 1;
        }
        if (startTime[1] - 30 === 0) {
          startTime[0] += 1;
        }

        //newTimeData에 데이터 (스케쥴) 집어넣기
        this._getRandomColor();
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
              color: this.state.selectedBlockColor,
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
          }
        }
      }
    });
    //rerender를 위해 기존 state.timedata를 newTimeData로 바꿔넣기
    this.setState({
      timedata: newTimeData,
    });

    //console.log('!!', this.state.timedata);
  };

  _toggleModal = rowdata => {
    //console.log('rowData:', rowdata.start);
    this.state.isModalVisible
      ? this.setState({
          isModalVisible: false,
          isEditDescription: false,
        })
      : this.setState({
          isModalVisible: true,
          selectedBlock: {
            start: rowdata.start,
            end: rowdata.end,
            name: rowdata.name,
            roomName: rowdata.roomName,
            description: rowdata.description,
          },
        });
  };

  render() {
    //console.log('TimeLine(', this.state.roomName, ') - render');
    //console.log('book!', this.state.bookings);

    const {timedata, isRefresh, selectedBlock} = this.state;
    return (
      <View style={styles.container}>
        {isRefresh ? (
          this._settingTimeBlock()
        ) : (
          <View style={styles.row}>
            {timedata.map((rowdata, index) => {
              return rowdata.check ? (
                rowdata.isStart ? (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => this._toggleModal(rowdata)}
                      key={index}
                      style={[
                        styles.scheduleblock,
                        {width: rowdata.size * wp('10%')},
                        {backgroundColor: rowdata.color},
                      ]}>
                      <Text numberOfLines={2} style={{padding: 7}}>
                        {rowdata.start +
                          ' ~ ' +
                          rowdata.end +
                          ' ' +
                          rowdata.description +
                          ' (' +
                          rowdata.name +
                          ')'}

                        {/* {console.log(
                          '텍스트:',
                          rowdata.id,
                          rowdata.start,
                          '~',
                          rowdata.end,
                        )} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null
              ) : (
                <View key={index}>
                  <TouchableOpacity
                    key={index}
                    style={styles.timeblock}
                    //onLongPress={() => console.log('꾹누름 드래그옵션')}
                    onPress={() =>
                      this.props.navigation.navigate('Booking_step3', {
                        navigation: this.props.navigation,
                        day: this.props.day,
                        rooms: this.state.rooms,
                        roomName: this.state.roomName,
                        startTime: rowdata.id,
                      })
                    }
                  />
                </View>
              );
            })}
          </View>
        )}
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={this._toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.text_container}>
                <Text style={styles.text_header}>예약자 :</Text>
                <Text style={styles.text}>{selectedBlock.name}</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text_header}>회의실 :</Text>
                <Text style={styles.text}>{selectedBlock.roomName}</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text_header}>예약시간 :</Text>
                <Text style={styles.text}>
                  {selectedBlock.start} ~ {selectedBlock.end}
                </Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text_header}>이용목적 :</Text>
                <Text style={styles.text}>{selectedBlock.description}</Text>
              </View>
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    shadowColor: '#000',
    borderRadius: 10,
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
  text_container: {
    paddingBottom: 5,
    flexDirection: 'row',
  },
  text_header: {
    flex: 1,
    textAlign: 'right',
  },
  text: {
    flex: 2,
    paddingLeft: 5,
  },
});
