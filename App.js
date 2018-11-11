import React from 'react';
import { WebView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
  render() {
    return (<View style={{flex:1}}>
        <WebView
            source={{uri: 'http://nelson54.github.io/flappy-bird/index.html'}}
            style={{flex: 1, height: '100%', width: '100%'}}
        />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
