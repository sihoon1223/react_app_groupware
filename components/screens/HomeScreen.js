import React from "react";
import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";

import { StyleSheet, View, Text, Button } from "react-native";

import NavigationHeader from "../component/NavigationHeader";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    //this.props.navigation.dispatch(DrawerActions.openDrawer());
    // this.props.navigation.navigate("HomeDrawer");
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationHeader nav={this.props.navigation}></NavigationHeader>
        <View
          style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
        >
          <Text>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
