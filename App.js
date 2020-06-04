import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';

import LoadingScreen from './components/screens/LoadingScreen';
import MainStack from './components/navigation/MainStack';

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
        <SafeAreaView style={{flex: 1}}>
          {/* {Platform.OS === "ios" ? <View style={styles.statusBar} /> : <></>} */}
          <View style={styles.statusBar} />
          {isLoading ? <LoadingScreen /> : <MainStack />}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  statusBar: {
    backgroundColor: '#fcfcfc',
    //height: Constants.statusBarHeight,
  },
});
export default App;
