import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default class QuestionSubjective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      text: "",
      required: props.required,
      _setAnswerDatas: props._setAnswerDatas,
      reqCheck: props.reqCheck,
      isfocused: false,
    };
  }
  _setExtraHeight = () => {
    if (!this.state.isfocused) {
      //textInput 클릭시
      this.setState({ isfocused: true });
    } else {
      this.setState({ isfocused: false });
      Keyboard.dismiss;
    }
  };
  render() {
    const radioButtons = [];

    return (
      <View
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          //필수값인 경우 Layout 된 시점에 SurveyScrenn4의 체크여부를 위한 배열에 boolean값 등록 필수면 false 아니면 true
          if (this.state.required === 1) {
            this.state.reqCheck(false, this.state.id, this.state.question);
          } else {
            this.state.reqCheck(true, this.state.id, this.state.question);
          }
        }}
        style={{
          paddingBottom: 20,
        }}
      >
        <View style={styles.title_container}>
          <Text style={styles.title_text}>{this.state.question}</Text>
          {this.state.required === 1 ? (
            <Text style={styles.title_required}>*</Text>
          ) : (
            <></>
          )}
        </View>
        <TextInput
          style={styles.inputArea}
          placeholder="의견을 작성해주세요."
          multiline
          onBlur={() => {
            if (this.state.text !== "") {
              this.state._setAnswerDatas(this.state.id, this.state.text);
              this.state.reqCheck(true, this.state.id, this.state.question);
            }
          }}
          blurOnSubmit={false}
          returnKeyType="next"
          onChangeText={(text) => {
            this.state.text = text;
          }}
          // onBlur={this._setExtraHeight}
          // onFocus={this._setExtraHeight}
        />
        {/* {this.state.isfocused ? <View style={{ height: 300 }}></View> : <></>} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    marginTop: wp("100%") < 450 ? wp("3%") : wp("1.5%"), //10
    borderBottomWidth: wp("100%") < 450 ? wp("0.4%") : wp("0.2%"), //1.5
    borderTopWidth: wp("100%") < 450 ? wp("0.4%") : wp("0.2%"), //1.5
    borderBottomColor: "gray",
    borderTopColor: "gray",
    flexDirection: "row",
  },
  title_text: {
    margin: wp("100%") < 450 ? wp("2") : wp("1%"), //5
    fontWeight: "bold",
    fontSize: wp("100%") < 450 ? wp("4%") : wp("2%"), //15
  },
  title_required: {
    margin: wp("100%") < 450 ? wp("2") : wp("1%"), //5
    fontWeight: "bold",
    fontSize: wp("100%") < 450 ? wp("4%") : wp("2%"), //15
    color: "red",
  },
  opinion: {
    fontWeight: "bold",
    marginTop: wp("100%") < 450 ? wp("3%") : wp("1.5%"), //10
  },
  inputArea: {
    marginTop: wp("100%") < 450 ? wp("3%") : wp("1.5%"), //10
    height: wp("100%") < 450 ? wp("25%") : wp("12.5%"), //100
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
  },
});
