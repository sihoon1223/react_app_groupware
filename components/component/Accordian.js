import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class Accordian extends Component {
  constructor(props) {
    Icon.loadFont();
    super(props);
    this.state = {
      data: props.data,
      expanded: false, //accordian 확장 여부
    };
  }
  //부모인 SurveyScreen2에게 부서 id를 prop으로 넘겨줌
  _changeToParent(dept_id) {
    this.props.changeFromChild(dept_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => this.toggleExpand()}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            style={styles.icon_style}
          />
        </TouchableOpacity>
        {this.props.data.children.map(
          (item, key) =>
            this.state.expanded && (
              <TouchableOpacity
                activeOpacity={0.8}
                key={key}
                onPress={this._changeToParent.bind(this, item.id)}>
                <View style={styles.child} key={key}>
                  <Text style={styles.child_name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ),
        )}
      </View>
    );
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: wp('100%') < 450 ? wp('2%') : wp('1.5%'), //10
  },
  title: {
    fontSize: wp('100%') < 450 ? wp('3.5%') : wp('2%'), //15
    fontWeight: 'bold',
    color: '#5e5d5d',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp('100%') < 450 ? wp('14%') : wp('7%'), //56
    paddingLeft: wp('100%') < 450 ? wp('3.5%') : wp('2%'), //10
    paddingRight: wp('100%') < 450 ? wp('4.5%') : wp('3%'), //18
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  child: {
    backgroundColor: '#e8e8e8',
    padding: wp('100%') < 450 ? wp('3%') : wp('2%'), //10
    height: wp('100%') < 450 ? wp('12%') : wp('8%'), //40
    borderBottomWidth: wp('100%') < 450 ? wp('0.1%') : wp('0.05%'), //0.3
    borderBottomColor: '#fcfcfc',
  },
  icon_style: {
    color: '#5e5d5d',
  },
  child_name: {
    fontSize: wp('100%') < 450 ? wp('3.5%') : wp('2%'), //13
    color: '#6d6b6b',
  },
});
