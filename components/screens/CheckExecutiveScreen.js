import React from 'react';

import {StyleSheet, View, Text, Button, FlatList} from 'react-native';

import ExecutiveCard from '../component/ExecutiveCard';
import NavigationHeader from '../component/NavigationHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CheckExcutiveScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exec: [],
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

  componentDidMount() {
    this._getExecutive('123');
  }

  _getExecutive = async url => {
    const response = await fetch('http://210.181.192.198:8080/v1/executive');
    const responseJson = await response.json();

    const response_state = await fetch(
      'http://210.181.192.198:8080/v1/executivestate',
    );
    const response_json = await response_state.json();

    console.log(response_json);

    responseJson.map(data => {
      response_json.map(state => {
        if (state.executiveState === data.state) {
          state.value = true;
        } else {
          state.value = false;
        }
      });
      data.ExecState = response_json;
      this.state.exec.push(data);
      console.log(data);
    });

    //console.log(responseJson[0]);
  };

  _ExecutiveCardCreate = ({item}) => {
    const {
      executiveName,
      executiveDept,
      executivePhone,
      executiveRank,
      ExecState,
      description,
    } = item;
    return (
      <ExecutiveCard
        ExecName={executiveName}
        ExecDept={executiveDept}
        ExecPhone={executivePhone}
        ExecRank={executiveRank}
        ExecState={ExecState}
        description={description}
      />
    );
  };

  render() {
    // const exec = [
    //   {
    //     no: 1,
    //     ExecName: '김도영',
    //     ExecRank: '주임',
    //     ExecDept: '모바일사업실',
    //     ExecPhone: '010-8344-9733',
    //     ExecState: [
    //       {
    //         execstate: '재  실',
    //         number: 0,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '회  의',
    //         number: 1,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '출  장',
    //         number: 2,
    //         value: true,
    //         description: '',
    //       },
    //       {
    //         execstate: '휴  가',
    //         number: 3,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '부  재',
    //         number: 4,
    //         value: false,
    //         description: '',
    //       },
    //     ],
    //   },
    //   {
    //     no: 2,
    //     ExecName: '김도영',
    //     ExecRank: '주임',
    //     ExecDept: '모바일사업실',
    //     ExecPhone: '010-8344-9733',
    //     ExecState: [
    //       {
    //         execstate: '재  실',
    //         number: 0,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '회  의',
    //         number: 1,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '출  장',
    //         number: 2,
    //         value: true,
    //         description: '',
    //       },
    //       {
    //         execstate: '휴  가',
    //         number: 3,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '부  재',
    //         number: 4,
    //         value: false,
    //         description: '',
    //       },
    //     ],
    //   },
    //   {
    //     no: 3,
    //     ExecName: '김도영',
    //     ExecRank: '주임',
    //     ExecDept: '모바일사업실',
    //     ExecPhone: '010-8344-9733',
    //     ExecState: [
    //       {
    //         execstate: '재  실',
    //         number: 0,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '회  의',
    //         number: 1,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '출  장',
    //         number: 2,
    //         value: true,
    //         description: '',
    //       },
    //       {
    //         execstate: '휴  가',
    //         number: 3,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '부  재',
    //         number: 4,
    //         value: false,
    //         description: '',
    //       },
    //     ],
    //   },
    //   {
    //     no: 4,
    //     ExecName: '김도영',
    //     ExecRank: '주임',
    //     ExecDept: '모바일사업실',
    //     ExecPhone: '010-8344-9733',
    //     ExecState: [
    //       {
    //         execstate: '재  실',
    //         number: 0,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '회  의',
    //         number: 1,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '출  장',
    //         number: 2,
    //         value: true,
    //         description: '',
    //       },
    //       {
    //         execstate: '휴  가',
    //         number: 3,
    //         value: false,
    //         description: '',
    //       },
    //       {
    //         execstate: '부  재',
    //         number: 4,
    //         value: false,
    //         description: '',
    //       },
    //     ],
    //   },
    // ];

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
        <NavigationHeader nav={this.props.navigation} />
        {/* <View style={styles.header_title}>
          <Text>재실 임원 조회 </Text>
        </View> */}
        <View style={{paddingTop: 10}}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              // justifyContent: "center",
              alignSelf: 'center',
              marginBottom: 100,
            }}
            data={this.state.exec}
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

    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
