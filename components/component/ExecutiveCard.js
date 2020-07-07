import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import React from 'react';
import {Button} from 'react-native-elements';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

// react-native-responsive-screen 반응형 레이아웃 테스트용

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight =
//   Platform.OS === "ios"
//     ? Dimensions.get("window").height
//     : require("react-native-extra-dimensions-android").get(
//         "REAL_WINDOW_HEIGHT"
//       );

export default class ExecutiveCard extends React.Component {
  constructor(props) {
    Ionicons.loadFont();
    Icon.loadFont();
    super(props);
    this.state = {
      checkStateNumber: '',
      isAuth: this.props.isAuth || false,
      isModalVisible: false,
      ExecId: this.props.ExecId,
      ExecName: this.props.ExecName,
      ExecRank: this.props.ExecRank,
      ExecDept: this.props.ExecDept,
      ExecPhone: this.props.ExecPhone,
      ExecState: this.props.ExecState,
      ExecDescription: this.props.description,
      isEditDescription: false,
      ChangeDescription: '',
    };
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }
  _toggleModal = () => {
    this.state.isModalVisible
      ? this.setState({
          isModalVisible: false,
          isEditDescription: false,
        })
      : this.setState({
          isModalVisible: true,
        });
  };

  _goPhone = () => {
    let phoneNumber = this.state.ExecPhone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${this.state.ExecPhone}`;
    } else {
      phoneNumber = `tel:${this.state.ExecPhone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  _AsyncAlert = async () =>
    new Promise(resolve => {
      Alert.alert(
        'info',
        '저장이 완료되었습니다.',
        [
          {
            text: 'ok',
            onPress: () => {
              resolve('YES');
              const url = new URL(
                'http://210.181.192.190:8080/v1/executivestate/' +
                  this.state.ExecId,
              );

              let headers = {
                'Content-Type': 'application/json',
              };

              console.log(
                this.state.ExecState[this.state.checkStateNumber]
                  .executiveState,
              );

              let body = {
                executiveId: this.state.ExecId,
                executiveName: this.state.ExecName,
                executivePhone: this.state.ExecPhone,
                executiveRank: this.state.ExecRank,
                executiveDept: this.state.ExecDept,
                state: this.state.ExecState[this.state.checkStateNumber]
                  .executiveState,
                description: this.state.ChangeDescription,
              };
              console.log(this.state.checkStateNumber);
              fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body),
              })
                .then(function(response) {
                  if (response < 0) {
                    throw Error(response);
                  }

                  return response;
                })
                .catch(function(error) {
                  console.log(error);
                });
            },
          },
        ],
        {cancelable: false},
      );
    });

  render() {
    return (
      <View style={styles.card_container}>
        <View style={styles.card_user}>
          <View style={styles.card_user_img_container}>
            <Image
              style={styles.card_user_img}
              source={require('../../assets/imgs/dangdang.jpg')}
            />
          </View>
          <View style={{backgroundColor: '#fcfcfc', flex: 0.1}} />

          <View style={styles.card_user_profile}>
            <View style={styles.card_user_profile_names}>
              <Text style={styles.card_user_profile_name}>
                {this.state.ExecName}
              </Text>
              <Text style={styles.card_user_profile_rank}>
                {this.state.ExecRank}
              </Text>
            </View>
            <View style={styles.card_user_profile_dept}>
              <Text style={styles.card_user_profile_dept_name}>
                {this.state.ExecDept}
              </Text>

              <Ionicons
                style={{}}
                name="ios-information-circle"
                size={20}
                color="#7fa1f1"
                onPress={this._toggleModal}
              />
            </View>
            <View style={styles.card_user_action}>
              <Button
                title={this.state.ExecPhone}
                titleStyle={{fontSize: hp('1.9%')}}
                onPress={this._goPhone}
                type={'solid'}
                buttonStyle={{backgroundColor: '#87cefa'}}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
                icon={
                  <Ionicons
                    name="ios-call"
                    size={hp('2%')}
                    color="white"
                    style={{paddingRight: hp('0.6%')}}
                  />
                }
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {this.state.ExecState.map((data, key) => {
            if (data.value) {
              this.state.checkStateNumber = data.no - 1;
              console.log(data.value, data.no, data.executiveState);
            }
            return (
              <View
                style={{borderWidth: 1, borderColor: 'lightgray'}}
                key={key}>
                <TouchableOpacity
                  disabled={!this.state.isAuth}
                  style={{
                    backgroundColor: data.value ? 'lightgray' : 'white',
                  }}
                  onPress={() => {
                    let ExecValue = [...this.state.ExecState];
                    if (ExecValue[data.no - 1].value === true) {
                      return;
                    }

                    Alert.alert(
                      '상태 변경',
                      '상태를 변경하시겠습니까?',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            //상태변경시 POST 바로 보낼것임
                            //변경하시겠습니까 한번 묻고 true면 POST 진행하고
                            // setState로 리랜더링 되도록

                            const url = new URL(
                              'http://210.181.192.190:8080/v1/executivestate/' +
                                this.state.ExecId,
                            );

                            let headers = {
                              'Content-Type': 'application/json',
                            };

                            let body = {
                              executiveId: this.state.ExecId,
                              executiveName: this.state.ExecName,
                              executivePhone: this.state.ExecPhone,
                              executiveRank: this.state.ExecRank,
                              executiveDept: this.state.ExecDept,
                              state: ExecValue[data.no - 1].executiveState,
                              description: this.state.ExecDescription,
                            };
                            console.log(this.state.checkStateNumber);
                            fetch(url, {
                              method: 'PUT',
                              headers: headers,
                              body: JSON.stringify(body),
                            })
                              .then(function(response) {
                                if (response < 0) {
                                  throw Error(response);
                                }

                                return response;
                              })
                              .catch(function(error) {
                                console.log(error);
                              });

                            ExecValue[data.no - 1].value = true;

                            ExecValue[
                              this.state.checkStateNumber
                            ].value = false;
                            this.setState({
                              ExecState: ExecValue,
                            });
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text>{data.executiveState}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          // coverScreen={false}
          // deviceWidth={deviceWidth}
          // deviceHeight={deviceHeight}
          backdropOpacity={0.6}
          onBackdropPress={this._toggleModal}
          //onSwipeComplete={this._toggleModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 7,
                  borderBottomWidth: 3,
                  borderColor: 'lightgray',
                }}>
                {this.state.isEditDescription === false &&
                this.state.isAuth === true ? (
                  <Icon
                    name="edit"
                    size={20}
                    color="#7fa1f1"
                    onPress={() => {
                      this.setState({
                        isEditDescription: true,
                        ChangeDescription: '',
                      });

                      //this.state.isEditDescription = true;
                    }}
                  />
                ) : (
                  <></>
                )}

                {/* <Ionicons
                  name="md-close"
                  size={20}
                  color="#7fa1f1"
                  onPress={this._toggleModal}
                ></Ionicons> */}
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                }}>
                {this.state.isEditDescription === false ? (
                  <View>
                    <Text>{this.state.ExecDescription}</Text>
                  </View>
                ) : (
                  <View style={{alignSelf: 'center'}}>
                    <TextInput
                      style={{
                        borderWidth: 0.5,

                        borderColor: 'lightgray',
                        marginBottom: 10,
                      }}
                      onChangeText={text => {
                        //이거 왜 에러뜨지
                        this.state.ChangeDescription = text;
                      }}
                      placeholder={this.state.ExecDescription}
                      keyboardType="default"
                      multiline
                      blurOnSubmit={false}
                      returnKeyType="default"
                    />
                    <View style={{width: wp('70%'), alignItems: 'center'}}>
                      <Button
                        title="저장하기"
                        style={{width: wp('22%')}}
                        onPress={() => {
                          //버튼 누르면 POST 하고, 저장성공까지 보여주고 리랜더링
                          this._AsyncAlert();
                          this.setState({
                            ExecDescription: this.state.ChangeDescription,
                            isEditDescription: false,
                            isModalVisible: false,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* <Button title="Hide modal" onPress={this._toggleModal} /> */}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card_container: {
    width: hp('40%'),

    height: hp('30%'),
    backgroundColor: '#fcfcfc',
    paddingRight: hp('4%'),
    paddingLeft: hp('4%'),
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,

    marginBottom: hp('2%'),
  },
  card_user: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp('1.5%'),
  },
  card_user_img_container: {
    flex: 2.3,
    // justifyContent: "flex-start",
  },
  card_user_img: {
    width: null,
    height: null,
    flex: 1,
    borderRadius: 5,
  },
  card_user_profile: {
    flex: 3.6,
    // justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  card_user_profile_names: {
    flexDirection: 'row',
    marginLeft: hp('1.2%'),
    marginRight: hp('1.2%'),
    marginTop: hp('1.2%'),
    marginBottom: hp('0.6%'),
  },
  card_user_profile_name: {
    fontSize: hp('2.8%'),
    fontWeight: '600',
  },
  card_user_profile_rank: {
    fontSize: hp('1.9%'),
    fontWeight: '200',
    marginTop: hp('1.2%'),
    marginLeft: hp('0.5%'),
  },
  card_user_profile_dept: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('1.5%'),
    marginRight: hp('1.2%'),
    marginBottom: hp('1.2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#c5c2c2d6',
  },
  card_user_profile_dept_name: {
    fontSize: hp('2%'),
    marginBottom: hp('1.2%'),
  },
  card_user_action: {
    margin: hp('1.2%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  centeredView: {
    justifyContent: 'center',
    //flex: 1,
    //flexDirection: "row-reverse",
  },
  modalView: {
    alignSelf: 'center',
    //justifyContent: "center",
    backgroundColor: '#fcfcfc',
    shadowColor: '#000',

    borderRadius: 10,

    alignItems: 'center',
    width: wp('70%'),
    height: 150,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
