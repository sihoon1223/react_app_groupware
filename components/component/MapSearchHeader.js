import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

export default class MapSearchHeader extends Component {
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  constructor(props) {
    super(props);
    console.log('*', this.props.navigation);
    Ionicons.loadFont();
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.backbtn_container}>
          <Ionicons
            name="md-arrow-back"
            size={hp('4%')}
            color="gray"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </View>
        <View style={styles.search_bar_container}>
          <View style={styles.search_bar_box_container}>
            <View style={styles.search_bar_box}>
              <View style={styles.search_bar}>
                <Text style={styles.search_text}>
                  경기도 성남시 분당구 삼평동
                </Text>
              </View>
            </View>
            <Button
              title={'검색'}
              titleStyle={{fontSize: hp('1.9%')}}
              //onPress={}
              style={{paddingRight: wp('3%')}}
              type={'clear'}
            />
          </View>
        </View>
      </View>
    );
  }

  //     <View
  //       style={{
  //         marginRight: -20,
  //         paddingLeft: 20,
  //       }}>
  //       <Ionicons
  //         name="ios-menu"
  //         size={hp('4%')}
  //         color="white"
  //         onPress={() => {
  //           this.props.nav.dispatch(DrawerActions.toggleDrawer());
  //         }}
  //       />
  //     </View>
  //     <View>
  //       <TouchableOpacity
  //         onPress={() => {
  //           this.props.nav.navigate('HomeScreen');
  //         }}>
  //         <Image
  //           resizeMode="contain"
  //           style={{
  //             width: wp('25%'),
  //             height: wp('100%') < 480 ? hp('8%') : hp('5%'),
  //           }}
  //           source={require('../../assets/imgs/ktnet_logo_white.png')}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //     <View>
  //       <Ionicons name="ios-menu" size={hp('4%')} color="#3f3f3f" />
  //     </View>
  //   </View>
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: hp('8%'),
    //flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#fcfcfc',
    //position: 'absolute',
  },
  backbtn_container: {
    flex: 1,
    justifyContent: 'center',
    marginRight: -20,
    paddingLeft: 20,
  },
  search_bar_container: {
    flex: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  search_bar_box_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search_bar_box: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  search_bar: {
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  search_text: {
    paddingLeft: 10,
  },
});
