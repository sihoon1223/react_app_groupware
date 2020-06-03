import React from 'react';
// npm install react-native-table-component 테이블 만들려면 설치해야함

import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerName: '',
      roomName: this.props.roomName,
      timedata: [],
      reserveData: [
        {
          startTime: '9:30',
          endTime: '11:30',
          reserver: '김도영',
          description: '모바일사업실 ',
        },
        {
          startTime: '18:30',
          endTime: '20:00',
          reserver: '김시훈',
          description: '모바일사업실',
        },
      ],
      tableHead: [
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
      ],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
      ],
    };

    for (let i = 0; i < 26; i++) {
      this.state.timedata.push({
        check: false,
        start: '',
        end: '',
        name: '',
        script: '',
        id: i,
        isStart: false,
      });
    }
    this.state.reserveData.map((data, index) => {
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

      for (let i = startTime[0]; i < endTime[0]; i++) {
        if (i === startTime[0]) {
          this.state.timedata[i] = {
            check: true,
            start: data.startTime,
            end: data.endTime,
            name: data.reserver,
            script: data.description,
            id: this.state.timedata[i].id,
            isStart: true,
            size: endTime[0] - startTime[0],
          };
        } else {
          this.state.timedata[i] = {
            check: true,
            start: data.startTime,
            end: data.endTime,
            name: data.reserver,
            script: data.description,
            id: this.state.timedata[i].id,
            isStart: false,
            size: '',
          };
        }
      }
    });
  }

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

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {state.timedata.map((rowdata, index) => {
            return rowdata.check ? (
              rowdata.isStart ? (
                <TouchableOpacity
                  onPress={() => console.log('modal 띠우기')}
                  key={index}
                  style={{
                    zIndex: 10,
                    overflow: 'hidden',
                    backgroundColor: 'lightblue',
                    borderRightWidth: 0.5,
                    borderRightColor: 'lightgray',
                    width: rowdata.size * wp('10%'),
                    height: hp('10%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>
                    {rowdata.id + ' ' + rowdata.name + ' ' + rowdata.script}
                  </Text>
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                key={index}
                style={styles.timeblock}
                onLongPress={() => console.log('꾹누름 드래그옵션')}
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
            );
          })}
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          // coverScreen={false}
          // deviceWidth={deviceWidth}
          // deviceHeight={deviceHeight}
          backdropOpacity={0.6}
          onBackdropPress={this._toggleModal}
          //onSwipeComplete={this._toggleModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {width: wp('260%'), flex: 1},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeblock: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#cdcdcd',
    width: wp('10%'),
    height: hp('10%'),
  },
});
