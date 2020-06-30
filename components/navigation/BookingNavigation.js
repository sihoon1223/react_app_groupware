import React from 'react';

import {createAppContainer, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NavigationHeader from '../component/NavigationHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import BookingResourceScreen from '../screens/BookingResourceScreen';
import BookingResourceScreen2 from '../screens/BookingResourceScreen2';
import BookingResourceScreen3 from '../screens/BookingResourceScreen3';

Ionicons.loadFont();

const BookingNavigation = createStackNavigator(
  {
    Booking_step1: {
      screen: BookingResourceScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Booking_step2: {
      screen: BookingResourceScreen2,
      navigationOptions: () => ({
        title: '회의실 예약 조회',
      }),
    },
    Booking_step3: {
      screen: BookingResourceScreen3,
      navigationOptions: {
        title: '회의실 예약',
        headerRight: null,
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      //headerBackTitleVisible: false, // back button title 제거 (ios)
      headerBackTitle: '이전', //ios에서만 적용됨
      headerTitleAlign: 'center',
      //animationEnabled: false, //애니메이션 제거
      headerStyle: {
        height: hp('8%'),
        backgroundColor: '#3f3f3f',
        borderBottomWidth: 3,
        borderBottomColor: '#0b99a1',
      },
      headerBackTitleAlign: 'center',
      headerTitleStyle: {
        justifyContent: 'center',
        fontSize: 17,
        marginBottom:
          Platform.OS === 'android'
            ? wp('100%') > 400
              ? hp('4%')
              : hp('3.5%')
            : 0,
      },
      headerTintColor: '#fcfcfc',
      headerLeftContainerStyle: {
        marginBottom:
          Platform.OS === 'android'
            ? wp('100%') > 400
              ? hp('4%')
              : hp('3.5%')
            : 0,
      },
      headerRight: (
        <Ionicons
          onPress={() => {
            //console.log("*", navigation);
            // console.log(navigation.navigate("BookingStack"));
            // navigation.navigate("BookingStack", {
            //   screen: BookingResourceScreen,
            //   params: {
            //     day: navigation.state.day,
            //   },
            // });
            navigation.navigate('Booking_step3', {
              day: navigation.state.params.day,
              rooms: navigation.state.params.rooms,
              // navigation: navigation,
            });
          }}
          name="ios-add"
          size={40}
          color="white"
        />
      ),
      headerRightContainerStyle: {
        marginBottom:
          Platform.OS === 'android'
            ? wp('100%') > 400
              ? hp('4%')
              : hp('3.5%')
            : 0,
        paddingRight:
          Platform.OS === 'android'
            ? wp('100%') > 400
              ? hp('2%')
              : hp('1%')
            : 5,
      },
      headerTitleAlign: 'center', //android에서만 적용됨 navigation.navigate("BookingResourceScreen3")
    }),
    initialRouteName: 'Booking_step1',
  },
);

const style = StyleSheet.create({
  container_title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    height: wp('8%'),
  },
  title_text: {
    fontSize: wp('5%'),
  },
});
export default createAppContainer(BookingNavigation);
