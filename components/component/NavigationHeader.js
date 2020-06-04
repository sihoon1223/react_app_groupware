import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {DrawerActions} from 'react-navigation-drawer';

export default class Header extends Component {
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }
  constructor(props) {
    super(props);
    Ionicons.loadFont();
  }

  render() {
    return (
      <View style={styles.header}>
        <View
          style={{
            marginRight: -20,
            paddingLeft: 20,
          }}>
          <Ionicons
            name="ios-menu"
            size={hp('4%')}
            color="white"
            onPress={() => {
              this.props.nav.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.nav.navigate('HomeScreen');
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: wp('25%'),
                height: wp('100%') < 480 ? hp('8%') : hp('5%'),
              }}
              source={require('../../assets/imgs/ktnet_logo_white.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Ionicons name="ios-menu" size={hp('4%')} color="#3f3f3f" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3f3f3f',
    borderBottomWidth: 3,
    borderBottomColor: '#0b99a1',
  },
});
