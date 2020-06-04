import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Get from '../module/Get';
import QuestionRadio from '../component/QuestionRadio';
import OtherComment from '../component/OtherComment';
import QuestionSubjective from '../component/QuestionSubjective';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const QUESTION_LIST_URL = `${
  require('../../assets/setting/config.json').url
}survey/question/`;
export default class SurveyScreen4 extends Component {
  TESTURL = '';
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      QuestionDatas: '',
      AnswerDatas: [],
      otherComment: '',
      degree_id: this.props.navigation.state.params.degree_id,
      department_id: this.props.navigation.state.params.dept_id,
      service_id: this.props.navigation.state.params.service_id,
      QuestionisAnswered: [],
      QuestionName: [],
      QuestionOffset: [],
    };
    this.flatListRef = '';
    this.scrollRef = '';
    this.TESTURL = QUESTION_LIST_URL + this.state.degree_id;
  }
  _setAnswerCheck = (isReq, questionId, questionName) => {
    var mergeJSON = require('merge-json');
    this.state.QuestionisAnswered = mergeJSON.merge(
      this.state.QuestionisAnswered,
      {[`${questionId}`]: isReq},
    );
    this.state.QuestionName = mergeJSON.merge(this.state.QuestionName, {
      [`${questionId}`]: questionName,
    });
  };
  _setAnswerDatas = (questionId, text) => {
    var mergeJSON = require('merge-json');
    var ans = {
      [`ans-${questionId}`]: text,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
  };
  _dataFromChild = datas => {
    //콜백메서드 등록
    this.setState({QuestionDatas: datas, isLoading: false});
  };
  _ChangeOtherComment = text => {
    this.state.otherComment = text;
  };
  onRefresh = () => {
    this._getSurveyQuestionList();
    console.log('onRefresh2');
  };
  _setValue = (questionId, value) => {
    var mergeJSON = require('merge-json');
    var ans = {
      [`ans-${questionId}`]: value,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
  };
  _findDimensions = layout => {
    const {x, y, width, height} = layout;
    if (this.state.QuestionOffset.length === 0) {
      this.state.QuestionOffset.push(0);
    } else {
      this.state.QuestionOffset.push(
        this.state.QuestionOffset[this.state.QuestionOffset.length - 1] +
          height,
      );
    }
  };
  _renderQuestion = ({item}) => {
    const {id, degree_id, type, required, question, children} = item;
    //console.log("_renderQuestion,", this.state.sihoon);
    if (type === 'radio') {
      return (
        <View
          onLayout={event => {
            this._findDimensions(event.nativeEvent.layout);
          }}>
          <QuestionRadio
            ref={ref => (this.questionRadio = ref)}
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            children={children}
            onSelect={this._setValue}
            reqCheck={this._setAnswerCheck}
          />
        </View>
      );
    } else if (type === 'text') {
      return (
        <View
          onLayout={event => {
            this._findDimensions(event.nativeEvent.layout);
          }}>
          <QuestionSubjective
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            _setAnswerDatas={this._setAnswerDatas}
            reqCheck={this._setAnswerCheck}
          />
        </View>
      );
    } else {
      //리스트 형식 질문타입 컴포넌트 호출 부분 추후 진행예정
    }
  };
  _submitAction = async () => {
    /*
      설문제출 함수
      firstkey - 설문 시작번호 기억을 위해 사용 이 숫자 기준으로 index 값 만듬
      QuesionisAnswered[] 배열에 [질문번호 - 체크여부] 키-쌍으로 저장되어 있음
    */
    const firstkey = Object.keys(this.state.QuestionisAnswered)[0];
    for (let item in this.state.QuestionisAnswered) {
      const index = item - firstkey;
      if (this.state.QuestionisAnswered[item] === false) {
        Alert.alert(
          '필수 항목을 입력해주세요\n',
          '- ' + this.state.QuestionName[item],
        ); //이유는 모르겠지만 alert 때문에 랜더링이 2번되서 호출 2번함;
        //alert("필수 항목을 입력해주세요"); //이유는 모르겠지만 alert 때문에 랜더링이 2번되서 호출 2번함;
        if (Platform.OS === 'ios') {
          console.log('ios: ', this.scroll);
          this.flatListRef.scrollToIndex({
            animated: true,
            index: index,
          });
          // this.scroll.props.scrollToPosition(
          //   0,
          //   this.state.QuestionOffset[index]
          // );
          // this.scroll.props.scrollToPosition(0, 0);
        } else {
          this.scrollRef.scrollTo({
            x: 0,
            y: this.state.QuestionOffset[index],
            animated: true,
          });
        }

        /* 
        TODO : 현재 scrollTo 구현이 height 값을 사용해서 임의로 위치조정중 개선이 필요
        주석 코드는 FlatList에서 제공하는 scrollToIndex 함수 이용 코드임 
         this.flatListRef.scrollTo(0, 0);
         this.setState({ sihoon: true });
         this.flatListRef.scrollToIndex({
           animated: true,
           index: index,
         });
        
        */
        return;
      }
    }
    const url = new URL('http://61.73.147.176/api/v1/survey');
    let headers = {
      'Content-Type': 'application/json',
    };
    var mergeJSON = require('merge-json');
    var ans = {
      [`memo`]: this.state.otherComment,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
    let body = {
      degree_id: this.state.degree_id,
      department_id: this.state.department_id,
      service_id: this.state.service_id,
    };
    body = mergeJSON.merge(body, this.state.AnswerDatas);
    // console.log(body);
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response);
        }
        return response;
      })
      .then(function(response) {
        //
      })
      .catch(function(error) {
        console.log(error);
      });
    if (Platform.OS === 'web') {
      alert('설문조사가 완료되었습니다.');
    } else {
      Alert.alert('설문조사가 완료되었습니다.');
    }
    this.props.navigation.navigate('Survey_step1');
  };
  render() {
    console.log(this.state.QuestionDatas);
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="small" color="gray" />
        <Get url={this.TESTURL} dataFromChild={this._dataFromChild} />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>Step4. 설문 답변을 입력해주세요.</Text>
          {Platform.OS === 'ios' ? (
            <KeyboardAwareScrollView
              innerRef={ref => {
                this.scroll = ref;
              }}
              contentContainerStyle={{
                flex: 1,
                width: null,
                height: null,
              }}>
              <FlatList
                data={this.state.QuestionDatas}
                ref={ref => {
                  this.flatListRef = ref;
                }}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={20}
                onEndReachedThreshold={1}
                renderItem={this._renderQuestion}
                ListFooterComponent={
                  <OtherComment
                    _submitAction={this._submitAction}
                    _ChangeOtherComment={this._ChangeOtherComment}
                  />
                }
              />
            </KeyboardAwareScrollView>
          ) : (
            <ScrollView
              ref={ref => {
                this.scrollRef = ref;
              }}>
              <FlatList
                data={this.state.QuestionDatas}
                ref={ref => {
                  this.flatListRef = ref;
                }}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={20}
                onEndReachedThreshold={1}
                scrollEnabled={false}
                renderItem={this._renderQuestion}
              />
              <OtherComment
                _submitAction={this._submitAction}
                _ChangeOtherComment={this._ChangeOtherComment}
              />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCFCFC',
  },
  survey_container: {
    flex: 1,
    height: wp('100%') < 450 ? wp('25%') : wp('12.5%'), //100
    padding: '5%',
  },
  title: {
    fontSize: wp('100%') < 450 ? wp('6%') : wp('3%'), //20
    paddingTop: '5%',
    paddingLeft: '5%',
    fontWeight: 'bold',
  },
  text: {
    paddingBottom: wp('100%') < 450 ? wp('2%') : wp('1%'), //10
  },
  // opinion: {
  //   fontWeight: "bold",
  //   marginTop: wp("3%"), //10
  // },
  // inputArea: {
  //   marginTop: wp("3%"), //10
  //   height: wp("100"), //100
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   textAlignVertical: "top",
  // },
});
