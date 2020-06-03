import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class OtherComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _submitAction: props._submitAction,
      _ChangeOtherComment: props._ChangeOtherComment,
      empty: [],
      // isfocused: false,
    };
  }

  render() {
    //console.log("othercomment-render");
    return (
      <View>
        <View
          style={{
            paddingBottom: wp('6%'), //20
          }}
          ref={ref => {
            this.view = ref;
          }}>
          <Text style={styles.opinion}>기타의견</Text>
          <TextInput
            ref={ref => {
              this.text = ref;
            }}
            style={styles.inputArea}
            placeholder="기타의견을 작성해주세요."
            keyboardType="default"
            multiline
            blurOnSubmit={false}
            returnKeyType="default"
            onChangeText={text => {
              this.state._ChangeOtherComment(text);
            }}
            // onBlur={this._setExtraHeight}
            // onFocus={this._setExtraHeight}
          />
        </View>
        {/* {this.state.isfocused ? <View style={{ height: 300 }}></View> : <></>} */}
        <Button onPress={this.state._submitAction} title="제출하기" />
        {/* {this.state.isfocused ? <View style={{ height: 300 }}></View> : <></>} */}
      </View>
    );
  }

  // _setExtraHeight = () => {
  //   if (!this.state.isfocused) {
  //     //textInput 클릭시
  //     this.setState({ isfocused: true });
  //   } else {
  //     this.setState({ isfocused: false });
  //     Keyboard.dismiss;
  //   }
  // };
}

const styles = StyleSheet.create({
  opinion: {
    fontWeight: 'bold',
    fontSize: wp('100%') < 450 ? wp('4%') : wp('2%'),
    marginTop: wp('100%') < 450 ? wp('3%') : wp('1.5%'), //10
  },
  inputArea: {
    marginTop: wp('100%') < 450 ? wp('3%') : wp('1.5%'), //10
    height: wp('100%') < 450 ? wp('25%') : wp('12.5%'), //100
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});
