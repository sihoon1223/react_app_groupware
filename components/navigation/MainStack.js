import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {Image, Dimensions, Platform, View} from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CheckExecutiveScreen from '../screens/CheckExecutiveScreen';

import SurveyNavigation from './SurveyNavigation';
import SettingNavigation from './SettingNavigation';
import BookingNavigation from './BookingNavigation';

import Header from '../component/NavigationHeader';

//import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSidebarMenu from './CustomDrawerMenu';
//import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

const DrawerNavigation = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    SurveyStack: {
      screen: SurveyNavigation,
    },
    CheckExecutiveScreen: {
      screen: CheckExecutiveScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    BookingStack: {
      screen: BookingNavigation,
      navigationOptions: {
        headerShown: false,
      },
    },
    SettingStack: {
      // screen: UpdateExcutiveListScreen,
      screen: SettingNavigation,
      navigationOptions: {
        headerShown: false,
      },
    },
    // defaultNavigationOptions: ({ navigation }) => ({
    //   animationEnabled: false,
    //   headerStyle: {
    //     height: hp("8%"),
    //   },
    //   drawerBackgroundColor: "transparent",
    //   header: () => <Header nav={navigation} />,
    // }),
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: () => {
      if (Dimensions.get('window').width > 450) {
        return wp('50%');
      } else {
        return wp('60%');
      }
    },
  },
);

const MainNavigation = createStackNavigator(
  {
    HomeDrawer: {
      screen: DrawerNavigation,
    },

    LoginScreen: {
      screen: LoginScreen,
    },
    // You will use this.props.navigation.replace('HomeDrawer') after login process.
  },
  {
    initialRouteName: 'LoginScreen',
    defaultNavigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
);

export default createAppContainer(MainNavigation);
