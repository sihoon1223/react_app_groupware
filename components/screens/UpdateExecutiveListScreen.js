import React from 'react';

import {StyleSheet, View, Text, Button, FlatList} from 'react-native';

import ExecutiveCard from '../component/ExecutiveCard';
import NavigationHeader from '../component/NavigationHeader';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import Ionicons from "react-native-vector-icons/Ionicons";

export default class UpdateExecutiveListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: true,
    };
  }

  _toggleModal = () => {
    this.state.isModalVisible
      ? this.setState({
          isModalVisible: false,
        })
      : this.setState({
          isModalVisible: true,
        });
  };

  _ExecutiveCardCreate = ({item}) => {
    const {ExecName, ExecDept, ExecPhone, ExecRank, ExecState} = item;

    return (
      <View>
        <ExecutiveCard
          isAuth={true}
          ExecName={ExecName}
          ExecDept={ExecDept}
          ExecPhone={ExecPhone}
          ExecRank={ExecRank}
          ExecState={ExecState}
        />
        {/* {this.state.isAuth ? <Button title="저장하기" /> : <></>} */}
      </View>
    );
  };

  render() {
    const exec = [
      {
        ExecName: '김도영',
        ExecRank: '주임',
        ExecDept: '모바일사업실',
        ExecPhone: '010-8344-9733',
        ExecState: [
          {
            execstate: '재  실',
            number: 0,
            value: false,
            description: '',
          },
          {
            execstate: '회  의',
            number: 1,
            value: false,
            description: '',
          },
          {
            execstate: '출  장',
            number: 2,
            value: true,
            description: '',
          },
          {
            execstate: '휴  가',
            number: 3,
            value: false,
            description: '',
          },
          {
            execstate: '부  재',
            number: 4,
            value: false,
            description: '',
          },
        ],
      },
      {
        ExecName: '김도영',
        ExecRank: '주임',
        ExecDept: '모바일사업실',
        ExecPhone: '010-8344-9733',
        ExecState: [
          {
            execstate: '재  실',
            number: 0,
            value: false,
            description: '',
          },
          {
            execstate: '회  의',
            number: 1,
            value: false,
            description: '',
          },
          {
            execstate: '출  장',
            number: 2,
            value: true,
            description: '',
          },
          {
            execstate: '휴  가',
            number: 3,
            value: false,
            description: '',
          },
          {
            execstate: '부  재',
            number: 4,
            value: false,
            description: '',
          },
        ],
      },
      {
        ExecName: '김도영',
        ExecRank: '주임',
        ExecDept: '모바일사업실',
        ExecPhone: '010-8344-9733',
        ExecState: [
          {
            execstate: '재  실',
            number: 0,
            value: false,
            description: '',
          },
          {
            execstate: '회  의',
            number: 1,
            value: false,
            description: '',
          },
          {
            execstate: '출  장',
            number: 2,
            value: true,
            description: '',
          },
          {
            execstate: '휴  가',
            number: 3,
            value: false,
            description: '',
          },
          {
            execstate: '부  재',
            number: 4,
            value: false,
            description: '',
          },
        ],
      },
      {
        ExecName: '김도영',
        ExecRank: '주임',
        ExecDept: '모바일사업실',
        ExecPhone: '010-8344-9733',
        ExecState: [
          {
            execstate: '재  실',
            number: 0,
            value: false,
            description: '',
          },
          {
            execstate: '회  의',
            number: 1,
            value: false,
            description: '',
          },
          {
            execstate: '출  장',
            number: 2,
            value: true,
            description: '',
          },
          {
            execstate: '휴  가',
            number: 3,
            value: false,
            description: '',
          },
          {
            execstate: '부  재',
            number: 4,
            value: false,
            description: '',
          },
        ],
      },
    ];

    // const exec = {
    //   ExecName: "김도영",
    //   ExecRank: "주임",
    //   ExecDept: "모바일사업실",
    //   ExecPhone: "010-8344-9733",
    // ExecState: [
    //   {
    //     execstate: "재  실",
    //     number: 0,
    //     value: false,
    //     description: "",
    //   },
    //   {
    //     execstate: "회  의",
    //     number: 1,
    //     value: false,
    //     description: "",
    //   },
    //   {
    //     execstate: "출  장",
    //     number: 2,
    //     value: true,
    //     description: "",
    //   },
    //   {
    //     execstate: "휴  가",
    //     number: 3,
    //     value: false,
    //     description: "",
    //   },
    //   {
    //     execstate: "부  재",
    //     number: 4,
    //     value: false,
    //     description: "",
    //   },
    // ],
    //   // }
    //   console.log(exec);
    return (
      <View style={styles.container}>
        {/* <NavigationHeader nav={this.props.navigation}></NavigationHeader> */}
        {/* <View style={styles.header_title}>
          <Text>재실 임원 수정 </Text>
          <Ionicons
            style={{}}
            name="md-person-add"
            size={20}
            color="#0b99a1"
            onPress={this._toggleModal}
          />
          <Ionicons
            style={{}}
            name="md-search"
            size={20}
            color="#0b99a1"
            onPress={this._toggleModal}
          />
        </View> */}
        <View style={{paddingTop: 10}}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              // justifyContent: "center",
              alignSelf: 'center',
              marginBottom: 100,
            }}
            data={exec}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={20}
            onEndReachedThreshold={1}
            renderItem={this._ExecutiveCardCreate}
            scrollEnabled={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#c5c2c2b0',
  },

  header_title: {
    width: wp('100%'),
    height: hp('4%'),
    flexDirection: 'row',
    //backgroundColor: "transparent",
    backgroundColor: '#ffffff3c',
    //backgroundColor: "rgba(0, 0, 0, 0.1)",
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
