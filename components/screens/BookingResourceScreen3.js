import React from 'react';

import {StyleSheet, View, Text, Button, TextInput} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//import PickerAndroid from "react-native-picker-android";

import RNPickerSelect from 'react-native-picker-select';
//import TimePicker from "react-native-simple-time-picker";
//import Picker from "react-native-multiple-picker";

import {SpinPicker} from 'react-native-spin-picker';
// npm install react-native-picker-select
// npm install react-native-simple-time-picker
// npm install rc-time-picker
// npm install react-native-linear-gradient
//npm i react-native-spin-picker
// npm install react-native-picker-android

// npm install react-native-date-picker

//let Picker = Platform.OS === "ios" ? PickerIOS : PickerAndroid;
//let PickerItem = Picker.Item;
//import Picker from "react-native-multiple-picker";
const hour = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];

export default class BookingResourceScreen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //hour: "",
      _setIsRefreshing: null,
      startTime: hour[this.props.navigation.state.params.startTime] || '',
      endTime: hour[this.props.navigation.state.params.startTime + 1] || '',
      roomName: this.props.navigation.state.params.roomName || '',
      description: '',
      reserver: '',
      day:
        this.props.navigation.state.params.day.dateString ||
        this.props.navigation.state.params.day,
    };

    // console.log(this.props.navigation.state.params._setIsRefreshing);
  }

  // InputAccessoryView() {
  //   return (
  //     <View style={defaultStyles.modalViewMiddle}>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           this.setState(
  //             {
  //               favSport5: this.state.previousFavSport5,
  //             },
  //             () => {
  //               this.inputRefs.favSport5.togglePicker(true);
  //             }
  //           );
  //         }}
  //         hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
  //       >
  //         <View testID="needed_for_touchable">
  //           <Text
  //             style={[
  //               defaultStyles.done,
  //               { fontWeight: "normal", color: "red" },
  //             ]}
  //           >
  //             Cancel
  //           </Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <Text>Name | Prefer</Text>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           this.inputRefs.favSport5.togglePicker(true);
  //         }}
  //         hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
  //       >
  //         <View testID="needed_for_touchable">
  //           <Text style={defaultStyles.done}>Done</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </View>
  //   );
  // }

  render() {
    //const day = this.props.navigation.state.params.day.dateString;

    //const minute = [00, 30];
    //console.log(PickerItem);
    return (
      <View style={styles.container}>
        <View style={styles.day_header}>
          <Text style={styles.day}>text</Text>
        </View>
        <View
          // style={{
          //   justifyContent: "center",
          //   alignItems: "center",
          //   flex: 1,
          //   padding: "5%",
          // }}
          style={
            Platform.OS === 'ios'
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }>
          <Text>회의실 선택</Text>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={change => {
              // console.log(change);
              this.setState({
                roomName: change,
              });
            }}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            items={[
              {label: 'roomA', value: 'roomA'},
              {label: 'roomB', value: 'roomB'},
              {label: 'roomC', value: 'roomC'},
              {label: 'roomD', value: 'roomD'},
              {label: 'roomE', value: 'roomE'},
              {label: 'roomF', value: 'roomF'},
              {label: 'roomG', value: 'roomG'},
              {label: 'roomH', value: 'roomH'},
            ]}
            value={this.state.roomName}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: '50%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',

              borderWidth: 2,
              borderColor: 'lightgray',
            }}>
            <View
              style={
                (Platform.OS === 'ios'
                  ? pickerSelectStyles.inputIOS
                  : pickerSelectStyles.inputAndroid,
                {
                  //marginLeft: "10%",
                  //marginRight: "10%",
                  borderWidth: 2,
                  borderColor: 'gray',
                  alignContent: 'center',
                  justifyContent: 'space-around',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                })
              }>
              <View
                style={{
                  width: '40%',
                  height: '40%',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  backgroundColor: 'white',
                }}>
                <Text style={{alignSelf: 'center'}}>시작시간</Text>
                <SpinPicker
                  data={hour}
                  value={this.state.startTime}
                  onValueChange={selectedItem =>
                    this.setState({
                      startTime: selectedItem,
                      endTime: selectedItem,
                    })
                  }
                  keyExtractor={number => {
                    //  console.log(number);
                    return number.toString();
                  }}
                  //onInputValueChanged={this.onValueChanged}
                  renderItem={item => (
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', fontSize: 25}}>
                        {item.toString()}
                      </Text>
                    </View>
                  )}
                />
              </View>

              {/* <View style={{ width: "1%" }}>
                <Text style={{ fontSize: 50 }}></Text>
              </View> */}

              <View
                style={{
                  width: '40%',
                  height: '40%',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  backgroundColor: 'white',
                }}>
                <Text style={{color: 'black', alignSelf: 'center'}}>
                  종료시간
                </Text>
                <SpinPicker
                  data={hour}
                  value={this.state.endTime}
                  onValueChange={selectedItem =>
                    this.setState({endTime: selectedItem})
                  }
                  keyExtractor={number => number.toString()}
                  //onInputValueChanged={this.onValueChanged}
                  renderItem={item => (
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', fontSize: 25}}>
                        {item.toString()}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: '5%',
            marginLeft: '10%',
            marginRight: '10%',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            height: '35%',
            padding: '10%',
          }}>
          <Text>이용목적</Text>
          <TextInput
            style={styles.inputArea}
            placeholder="이용목적을 입력해주세요"
            keyboardType="default"
            multiline
            blurOnSubmit={false}
            returnKeyType="default"
            onChangeText={text =>
              this.setState({
                description: text,
              })
            }
          />
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Button
              title="예약하기"
              onPress={() => {
                console.log(
                  this.state.startTime,
                  this.state.endTime,
                  this.state.roomName,
                  this.state.description,
                );
                let startTime = this.state.startTime.split(':');
                let endTime = this.state.endTime.split(':');
                if (startTime[0] > endTime[0]) {
                  console.log('fail');
                  return;
                } else if (
                  startTime[0] === endTime[0] &&
                  startTime[1] >= endTime[1]
                ) {
                  console.log('fail');
                  return;
                }
                console.log('success');
              }}
            />
            <Button
              title="취소하기"
              onPress={() => {
                this.props.navigation.navigate('Booking_step2', {
                  isRefreshing: true,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const placeholder = {
  label: '회의실 선택',
  value: null,
  color: 'black',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignSelf: "center",
    backgroundColor: '#c5c2c2b0',
    paddingBottom: '5%',
  },
  day_header: {
    width: wp('100%'),
    height: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cdcdcd',
  },
  day: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputArea: {
    marginTop: wp('100%') < 450 ? wp('3%') : wp('1.5%'), //10
    height: wp('100%') < 450 ? wp('25%') : wp('12.5%'), //100
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
    // padding: "5%",
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 16,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'blue',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
    // padding: "5%",
    backgroundColor: 'white',
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'blue',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
