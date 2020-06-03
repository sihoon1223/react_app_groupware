import React from "react";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

// npm install react-native-animated-loader
// npm install lottie-react-native;
// react-native link lottie-react-native
export default function loading() {
  return Platform.OS === "web" ? (
    <View>
      <Text style={styles.text}>Loading</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {/* 
      {
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
          source={require("../../loadicon/19869-heart-notifications.json")}
        ></AnimatedLoader>
      } */}
      <Image
        style={{ height: "100%", width: "100%" }}
        source={require("../../assets/imgs/ktnet_kor_1242.png")}
      />
      <Text style={{ color: "gray", fontSize: 10 }}>
        Copyright 2020 KTNET. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // flex: 1 - 전체 공간 다 차지
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#fcfcfc",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 20,
  },
});
