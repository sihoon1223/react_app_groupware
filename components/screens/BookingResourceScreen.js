import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import NavigationHeader from '../component/NavigationHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format, addDays} from 'date-fns';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],

  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘은',
};
LocaleConfig.defaultLocale = 'ko';
const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

export default class BookingResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationHeader nav={this.props.navigation} />
        <View style={styles.calendar_container}>
          <Text style={styles.text}>회의실을 예약할 날짜를 선택해주세요.</Text>
          <Calendar
            style={{
              width: wp('80%'),
              borderWidth: 1,
              borderColor: '#e6e0e0',
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
              //backgroundColor: "#ffffff",
              //calendarBackground: "#ffffff",
              textSectionTitleColor: '#b6c1cd', //월화수목금토일 색상
              //selectedDayBackgroundColor: "red",
              selectedDayTextColor: '#ffffff', ////선택된 날짜 색깔
              todayTextColor: '#00adf5', //오늘의 날짜 색깔
              dayTextColor: '#2d4150', //전체 날짜 색깔
              textDisabledColor: '#d9e1e8', //disable (이전 달의 끝 날짜 등) 날짜 색깔
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#00adf5',
              //disabledArrowColor: "red",
              //monthTextColor: "blue",
              //indicatorColor: "blue",
              // textDayFontFamily: "monospace",
              // textMonthFontFamily: "monospace",
              // textDayHeaderFontFamily: "monospace",
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            // Initially visible month. Default = Date()
            // current={'2020-05-26'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            //minDate={"2000-01-01"}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            //maxDate={"2100-01-01"}

            //TODO: 일정이 생기면 마크하게끔 만들기
            // markedDates={{
            //   "2020-05-16": {
            //     dots: [vacation, massage, workout],
            //     selected: true,
            //     marked: true,
            //     selectedColor: "gray",
            //   },
            //   "2020-05-17": { dots: [massage, workout], marked: true },
            //   "2020-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            //   //"2020-05-19": { disabled: true, disableTouchEvent: true },
            // }}
            markingType={'multi-dot'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              if (this._checkDay(day)) {
                this.props.navigation.navigate('Booking_step2', {
                  day: day,
                  navigation: this.props.navigation,
                });
              }
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy년, MM월'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            //renderArrow={(direction) => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
          />
        </View>
      </View>
    );
  }

  _checkDay = day => {
    const today = format(this.state.today, 'yyyy-MM-dd');
    //console.log('today:', today);
    if (day.dateString < today) {
      Alert.alert('Today: ' + today, '오늘 이전의 날짜 예약은 불가합니다.');
      return false;
    }
    return true;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  text: {
    paddingBottom: hp('3%'),
    fontWeight: '300',
  },
  calendar_container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
});
