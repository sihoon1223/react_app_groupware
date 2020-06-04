import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
export default class CustomDrawerMenu extends Component {
  constructor() {
    super();
    Icon.loadFont();
    this.items = [
      {
        navOptionIcon: 'home',
        navOptionName: '홈',
        screenToNavigate: 'HomeScreen',
      },
      {
        navOptionIcon: 'pencil-square-o',
        navOptionName: '설문 조사',
        screenToNavigate: 'SurveyStack',
      },
      {
        navOptionIcon: 'group',
        navOptionName: '임원 재실 조회',
        screenToNavigate: 'CheckExecutiveScreen',
      },
      {
        navOptionIcon: 'calendar-o',
        navOptionName: '회의실 예약',
        screenToNavigate: 'BookingStack',
      },
      {
        navOptionIcon: 'lock',
        navOptionName: '테스트페이지 (도영)',
        screenToNavigate: 'Test_page1',
      },
      {
        navOptionIcon: 'lock',
        navOptionName: '테스트페이지 (시훈)',
        screenToNavigate: 'Test_page2',
      },
    ];
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }
  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerProfile}>
          <View style={styles.drawerProfile_name_container}>
            <Text style={styles.drawerProfile_name}>김시훈</Text>
            <Text style={styles.drawerProfile_position}>주임</Text>
          </View>
          <View style={styles.drawerProfile_dept_container}>
            <Text style={styles.drawerProfile_dept}>모바일사업실</Text>
            <View style={styles.drawerProfile_setting_container}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SettingStack');
                }}>
                <Icon style={styles.drawerProfile_setting_icon} name="gears" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.drawerItem_container}>
          {this.items.map((item, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                this.props.navigation.navigate(item.screenToNavigate);
              }}>
              <View style={styles.drawerItem_item} key={key}>
                <View style={styles.drawerItem_icon_container}>
                  <Icon
                    name={item.navOptionIcon}
                    size={hp('3.5%')}
                    color="#808080"
                  />
                </View>
                <View>
                  <Text style={{fontSize: hp('2%')}}>{item.navOptionName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#fcfcfc',
    flex: 1,
  },
  drawerProfile: {
    flexDirection: 'column',
    height: hp('16%'),
    backgroundColor: '#3f3f3f',
  },
  drawerProfile_name_container: {
    flexDirection: 'row',
    height: hp('9%'),
  },
  drawerProfile_name: {
    paddingTop: hp('4%'),
    paddingLeft: hp('2%'),
    color: 'white',
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  drawerProfile_position: {
    paddingTop: hp('5.5%'),
    paddingLeft: wp('1.3%'),
    color: '#0b99a1',
    fontSize: hp('2.5%'),
    fontWeight: 'normal',
  },
  drawerProfile_dept_container: {
    flexDirection: 'row',
    height: hp('7%'),
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
  },
  drawerProfile_dept: {
    paddingBottom: hp('4.5%'),
    paddingLeft: hp('2%'),
    color: '#0b99a1',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  drawerProfile_setting_container: {
    flex: 1,
    paddingBottom: hp('4.5%'),
    flexDirection: 'row',
    paddingRight: hp('1.2%'),
    justifyContent: 'flex-end',
  },
  drawerProfile_setting_icon: {
    color: '#808080',
    fontSize: hp('2.5%'),
  },
  drawerItem_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  drawerItem_item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  drawerItem_icon_container: {
    width: hp('4.5%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: hp('1.2%'),
    marginLeft: hp('2%'),
  },
});
