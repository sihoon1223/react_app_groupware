import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
  }
  //부모인 SurveyScreen2에게 부서 id를 prop으로 넘겨줌

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }
}
