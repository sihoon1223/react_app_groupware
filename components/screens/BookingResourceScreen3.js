import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RNPickerSelect from 'react-native-picker-select';

import {SpinPicker} from 'react-native-spin-picker';

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

  render() {
    //const day = this.props.navigation.state.params.day.dateString;

    //const minute = [00, 30];
    //console.log(PickerItem);
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'red'}}>
        <View style={styles.day_header}>
          <Text style={styles.day}>{this.state.day}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.roomPick_container}>
            <View style={styles.title_container}>
              <Text>회의실 선택</Text>
            </View>

            <View style={styles.roomPick_container_cover}>
              <View
                style={
                  Platform.OS === 'ios'
                    ? pickerSelectStyles.inputIOS
                    : pickerSelectStyles.inputAndroid
                }>
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
            </View>
          </View>

          <View style={styles.timePick_container}>
            <View style={styles.title_container}>
              <Text>시간 선택</Text>
            </View>
            <View style={styles.timePick_Area}>
              <View style={styles.timePick_Item}>
                <View style={styles.title_container2}>
                  <Text>시작시간</Text>
                </View>
                <View style={styles.timePick_selector}>
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
              </View>
              <View style={styles.timePick_Item}>
                <View style={styles.title_container2}>
                  <Text>종료시간</Text>
                </View>

                <View style={styles.timePick_selector}>
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

          <View style={styles.description_container}>
            <View style={styles.title_container}>
              <Text>이용목적</Text>
            </View>
            <View style={styles.inputText_container}>
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
            </View>
            <View style={styles.button_container}>
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
      </KeyboardAwareScrollView>
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
    backgroundColor: '#eeeeee',
  },
  title_container: {
    flex: 1,
  },
  title_container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  roomPick_container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
    padding: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
  },
  timePick_container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
    padding: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
  },
  timePick_Area: {
    flex: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  timePick_Item: {
    flex: 4,

    margin: 20,
  },
  timePick_selector: {
    flex: 4,
  },
  description_container: {
    flex: 1,
    backgroundColor: 'white',
    margin: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
    padding: wp('100%') < 450 ? wp('3%') : wp('1.5%'),
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
  inputArea: {
    // marginTop: wp('100%') < 450 ? wp('3%') : wp('1.5%'), //10
    // height: wp('100%') < 450 ? wp('25%') : wp('12.5%'), //100
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    // textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  roomPick_container_cover: {
    flex: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: wp('5%'),
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  inputText_container: {
    flex: 3,
  },
  button_container: {
    padding: hp('1%'),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // marginTop: '5%',
    // marginBottom: '5%',
    // marginLeft: '10%',
    // marginRight: '10%',
    // fontSize: 16,

    borderWidth: 1,
    borderColor: 'lightgray',
    height: wp('10%'),
    color: 'blue',

    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    // color: 'blue',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: 'lightgray',
    color: 'blue',
    // marginTop: '5%',
    // marginBottom: '5%',
    // marginLeft: '10%',
    // marginRight: '10%',
    // fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: 'gray',
    // borderRadius: 8,
    // color: 'blue',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});
