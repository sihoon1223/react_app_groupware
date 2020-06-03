import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SurveyScreen from '../screens/SurveyScreen';
import SurveyScreen2 from '../screens/SurveyScreen2';
import SurveyScreen3 from '../screens/SurveyScreen3';
import SurveyScreen4 from '../screens/SurveyScreen4';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NavigationHeader from '../component/NavigationHeader';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Header from '../component/NavigationHeader';

const SurveyNavigation = createStackNavigator(
  {
    Survey_step1: {
      screen: SurveyScreen,
      // 각 router마다 고유로 설정할 수 있다.
      // navigationOptions: ({ navigation }) => ({
      //   header: () => <NavigationHeader nav={navigation} />,
      // }),
      navigationOptions: {
        headerShown: false,
      },
    },
    Survey_step2: {
      screen: SurveyScreen2,
    },
    Survey_step3: {
      screen: SurveyScreen3,
    },
    Survey_step4: {
      screen: SurveyScreen4,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      //headerBackTitleVisible: false, // back button title 제거 (ios)
      headerBackTitle: '이전', //ios에서만 적용됨

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
      headerTitleAlign: 'center', //android에서만 적용됨

      headerTitle: () => {},
    }),
    initialRouteName: 'Survey_step1',
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
export default createAppContainer(SurveyNavigation);
