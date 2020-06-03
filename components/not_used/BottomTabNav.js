import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import SurveyNavigation from '../navigation/SurveyNavigation';

Ionicons.loadFont();

const MainStackNavigation = createBottomTabNavigator(
  {
    Survey: {
      screen: SurveyNavigation,
    },
    Home: {
      screen: HomeScreen,
    },
    Setting: {
      screen: SettingScreen,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      swipeEnabled: true,
      adaptive: true,

      tabBarIcon: ({horizontal, tintColor}) => {
        //각 route 마다 tab bar의 icon 밑 이름을 맞게 설정
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Survey') {
          iconName = 'ios-filing';
        } else if (routeName === 'Setting') {
          iconName = 'ios-settings';
        }
        return (
          <IconComponent
            style={{paddingTop: 10}}
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4f44b4',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#fcfcfc',
      },
    },
    initialRouteName: 'Home', // 기본적인 시작 route는 home 화면
  },
);

// 헤더를 세팅한 후 반환
const Header = props => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {alignItems: 'center'},
  header_title: {fontSize: 18, color: 'black', fontWeight: 'bold'},
});

export default createAppContainer(MainStackNavigation);
