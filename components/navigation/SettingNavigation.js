import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { StyleSheet } from "react-native";

import SettingScreen from "../screens/SettingScreen";
import UpdateExecutiveListScreen from "../screens/UpdateExecutiveListScreen";

const SettingNavigation = createStackNavigator(
  {
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        //header: () => null,
        headerShown: false,
      },
    },
    ExecutiveScreen: {
      screen: UpdateExecutiveListScreen,
      navigationOptions: {
        title: "임원 재실 수정",
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      //headerBackTitleVisible: false, // back button title 제거 (ios)
      headerBackTitle: "이전", //ios에서만 적용됨
      headerTitleAlign: "center",
      //animationEnabled: false, //애니메이션 제거
      headerStyle: {
        height: hp("8%"),
        backgroundColor: "#3f3f3f",
        borderBottomWidth: 3,
        borderBottomColor: "#0b99a1",
      },
      headerBackTitleAlign: "center",
      headerTitleStyle: {
        justifyContent: "center",
        fontSize: 17,
        marginBottom:
          Platform.OS === "android"
            ? wp("100%") > 400
              ? hp("4%")
              : hp("3.5%")
            : 0,
      },
      headerTintColor: "#fcfcfc",
      headerLeftContainerStyle: {
        marginBottom:
          Platform.OS === "android"
            ? wp("100%") > 400
              ? hp("4%")
              : hp("3.5%")
            : 0,
      },
    }),
    initialRouteName: "SettingScreen",
  }
);

export default createAppContainer(SettingNavigation);
