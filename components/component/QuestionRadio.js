import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp}from "react-native-responsive-screen";

export default class QuestionRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      required: props.required,
      children: props.children,
      onSelect: props.onSelect,
      reqCheck: props.reqCheck,
      isEmpty: false,
      deviceWidth : true,
    };
    this.Radioref = "";
  }

  componentDidMount() {}
  render() {
    const radioButtons = [];
    this.state.children.map((item, key) => {
     
      radioButtons.push(
        <RadioButton style={styles.radio_button} value={item.id} key={item.id}>
          <View style={styles.radio_button_text_container}>
            <Text style={styles.radio_button_text}>{item.description}</Text>
          </View>
        </RadioButton>
      );
    });
    return (
      <View
        onLayout={(event) => {
          if (this.state.required === 1) {
            this.state.reqCheck(false, this.state.id, this.state.question);
          } else {
            this.state.reqCheck(true, this.state.id, this.state.question);
          }
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

        <RadioGroup
          color="#9575b2"
          highlightColor="#ccc8b9"
          onSelect={(value) => {
            //console.log(radioButtons[value].props.value);
            this.state.onSelect(this.state.id, radioButtons[value].props.value);
            this.state.reqCheck(true, this.state.id, this.state.question);
            this.state.isEmpty = true;
          }}
          style={styles.radio_group}
        >
          {radioButtons}
        </RadioGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    marginTop: wp("100%")<450 ? wp("3%"):wp("1%"), //wp("3%"), //10
    borderBottomWidth: wp("100%")<450 ? wp("0.4%"):wp("0.2%"), //wp("0.4%"), //1.5
    borderTopWidth: wp("100%")<450 ? wp("0.4%"):wp("0.2%"),//wp("0.4%"), //1.5
    borderBottomColor: "gray",
    borderTopColor: "gray",
    flexDirection: "row",
  },
  title_container2: {
    marginTop:  wp("100%")<450 ? wp("3%"):wp("1%"), //wp("3%"),  //10
    borderBottomWidth: wp("100%")<450 ? wp("0.4%"):wp("0.2%"), // wp("0.4%"), //1.5
    borderTopWidth:  wp("100%")<450 ? wp("0.4%"):wp("0.2%"), //wp("0.4%"),   //1.5
    borderBottomColor: "gray",
    borderTopColor: "gray",
    flexDirection: "row",
    backgroundColor: "red",
  },

  title_text: {
    margin:  wp("100%")<450 ? wp("1.5%"):wp("0.7%"),  //5
    fontWeight: "bold",
    fontSize: wp("100%")<450 ? wp("4%"):wp("2%"),//wp("4%"),  //15 
  },
  title_required: {
    margin:  wp("100%")<450 ? wp("1.5%"):wp("0.7%"), //wp("1.5%"),   //5
    fontWeight: "bold",
    fontSize: wp("100%")<450 ? wp("4%"):wp("2%"), //wp("4%"), //15
    color: "red",
  },
  radio_group: {
    marginTop: wp("100%")<450 ? wp("1.5%"):wp("0.7%"), // wp("1.5%"), //5
    marginBottom: wp("100%")<450 ? wp("1.5%"):wp("0.7%"),  // wp("1.5%"), //5
  },
  radio_button: {
    height: wp("100%")<450 ? wp("16%"):wp("8%"), //wp("16%"),  //50
    justifyContent: "flex-start",
    alignItems: "center",
  },
  radio_button_text: {
    fontSize: wp("100%")<450 ? wp("3.8%"):wp("1.9%"), //wp("3.8%"),  //13.5
    width: "100%",
  },
  radio_button_text_container: {
    // flex: 1,
    // // width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
