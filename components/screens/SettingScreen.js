import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import NavigationHeader from '../component/NavigationHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  settings = [
    {
      routerName: 'ExecutiveScreen',
      settingName: '재실 임원 수정',
      isAuth: true,
    },
    {settingName: '기본 환경 설정', isAuth: false},
    {settingName: '푸쉬 알림 설정', isAuth: false},
  ];
  render() {
    return (
      <View style={styles.container}>
        <NavigationHeader nav={this.props.navigation} />
        <View style={styles.setting_list_container}>
          {this.settings.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.props.navigation.navigate(`${item.routerName}`);
                }}>
                <View style={styles.settings} key={key}>
                  <Text>{item.settingName}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
  },
  setting_list_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('80%'),
    paddingTop: hp('5%'),
  },
  settings: {
    paddingLeft: wp('3%'),
    justifyContent: 'center',
    width: wp('80%'),
    height: hp('7%'),
    backgroundColor: '#e8e8e8',
    borderBottomWidth: 1,
    borderBottomColor: '#e1dede',
  },
});

export default SettingScreen;

/*

  <Custom value={value}>{this.props.children}</Custom> 이런 문법들이 존재하는데 여기서 this.props.children은 태그에 담겨있는 값들을 Custom컴포넌트가 아니라 그 자식의 컴포넌트에게
  전달하도록 하는 지정위치임(저 위치로 값이 들어가도록 default 설정이 되어 있음)
  예를 들면
  <Custom>
    <Child/>
  </Custom>
  이런식으로 컴포넌트 구성이 되어 있다면 Child 컴포넌트에 Custom의 값들이 전달되도록 되어 있음.
  Context API 사용할때 Provider Consumer 얘들에 적용되는 값들을 전달하는 용도로 쓰이는거 봤음.
*/
