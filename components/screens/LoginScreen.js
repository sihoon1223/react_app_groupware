import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {CheckBox, Button} from 'react-native-elements';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {/* <View style={styles.container}> */}
        <View style={styles.logo_container}>
          <Image
            resizeMode="cover"
            style={styles.logo}
            source={require('../../assets/imgs/ktnet_kor_1242.png')}
          />
        </View>
        <View style={styles.login_container}>
          <View style={styles.login_box}>
            <View style={styles.login_text_container}>
              <Text style={styles.login_text}>KTNET Mobile ERP</Text>
              <Text style={styles.login_text}>devlopment</Text>
            </View>
            <View style={styles.gray_border} />
            <View style={styles.login_text_container2}>
              <Text style={styles.login_text2}>KTNET 이메일 주소</Text>
              <TextInput
                placeholder="kt123@ktnet.co.kr"
                keyboardType="default"
                multiline
                //blurOnSubmit={false}
                returnKeyType="default"
                style={styles.login_input}
              />
            </View>
            <View style={styles.login_check_container}>
              <CheckBox
                style={styles.login_checkbox}
                checked={this.state.checked}
                onPress={() => {
                  this.setState({checked: true});
                }}
              />
              <Text style={styles.login_check_text}>이메일 주소 저장</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Button
                title="로그인"
                containerStyle={{
                  paddingLeft: wp('5%'),
                  paddingRight: wp('5%'),
                  paddingTop: hp('100%') < 400 ? wp('5%') : wp('2.5%'),
                }}
                buttonStyle={{height: hp('5%')}}
                titleStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '300',
                }}
                onPress={() => {
                  this.props.navigation.replace('HomeDrawer');
                }}
              />
            </View>
          </View>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  logo_container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    height: hp('30%'),
  },
  logo: {
    width: wp('100%'),
    height: hp('70%'),
  },
  login_container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: hp('70%'),
  },
  login_box: {
    height: hp('45%'),
    marginTop: wp('-25%'),
    margin: wp('10%'),
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  login_text_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: hp('2%'),
  },
  login_text: {
    fontSize: hp('2.8%'),
    alignSelf: 'center',
    color: '#5e5e5e',
  },
  login_text_container2: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: wp('5%'),
  },
  login_text2: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    paddingLeft: wp('5%'),
    color: '#5e5e5e',
  },
  login_input: {
    marginTop: wp('100%') < 400 ? wp('5%') : wp('1.5%'), //10
    margin: wp('5%'),
    paddingLeft: wp('2%'),
    height: hp('4%'),
    borderColor: '#dadada',
    borderWidth: 1.5,
    borderRadius: 6,

    textAlignVertical: 'top',
    backgroundColor: '#fcfcfc',
  },
  login_check_container: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  login_checkbox: {
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  login_check_text: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#5e5e5e',
  },
  gray_border: {
    borderBottomWidth: 2,
    borderBottomColor: '#c8c4c4',
    width: wp('50%'),
    paddingTop: hp('2%'),
    alignSelf: 'center',
  },
});
