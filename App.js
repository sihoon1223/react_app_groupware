/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoadingScreen from '../mobileBizApp/components/screens/LoadingScreen';
import MainStack from '../mobileBizApp/components/navigation/MainStack';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    // 스플래쉬 뷰 2.5초
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 500);
  }
  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        {/* {Platform.OS === "ios" ? <View style={styles.statusBar} /> : <></>} */}
        <View style={styles.statusBar} />
        {isLoading ? <LoadingScreen /> : <MainStack />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  statusBar: {
    backgroundColor: '#fcfcfc',
    //height: Constants.statusBarHeight,
  },
});
export default App;
