import React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ScrollView, { ScrollViewChild } from "react-native-directed-scrollview";
// npm install react-native-directed-scrollview , react-native link
export default class BookMRScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        bounces={true}
        bouncesZoom={true}
        maximumZoomScale={2.0}
        minimumZoomScale={0.5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <ScrollViewChild scrollDirection={"both"}>
          <Text>123</Text>
        </ScrollViewChild>
        <ScrollViewChild scrollDirection={"vertical"}>
          <Text>123</Text>
        </ScrollViewChild>
        <ScrollViewChild scrollDirection={"horizontal"}>
          <Text>123</Text>
        </ScrollViewChild>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: 1000,
    width: 1000,
  },
});
