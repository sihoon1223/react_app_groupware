import React from 'react';

import {StyleSheet, View} from 'react-native';
import Room from '../component/Room';

export default class BookingResourceScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  //get 모듈을 통해 가져온 데이터를 스테이트에 세팅
  _dataFromChild = datas => {
    /*
    TODO: this.setState와 this.state.example = 'example' 의 차이가 무엇인지 명확하게 알기

    this.setState({ surveyDatas: datas, isLoading: false }, () => {
      console.log("isLoading", this.state.isLoading);
    });
    */

    this.setState({surveyDatas: datas, isLoading: false});
  };

  render() {
    const day = this.props.navigation.state.params.day.dateString;
    return (
      <View style={styles.container}>
        <Room day={day} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
