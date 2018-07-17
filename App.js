import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChatEngineCore from 'chat-engine';
import { plugin } from 'chat-engine-notifications';

// PUBNUB
export const PUBNUB_PUBLISH_KEY = "<pubkey>"
export const PUBNUB_SUBSCRIBE_KEY = "<subkey>"

const ChatEngine = ChatEngineCore.create(
  { 
    publishKey: PUBNUB_PUBLISH_KEY, 
    subscribeKey: PUBNUB_SUBSCRIBE_KEY
  },
  { debug: true }
);

ChatEngine.proto('Me', plugin({
  events: ['$.invite', 'message'],
  platforms: { ios: true, android: true }
}));

export default class App extends React.Component {
  
  componentDidMount() {
    ChatEngine.connect(`alyssa1`, {
      signedOnTime: Date.now()
    }, 'auth')

    ChatEngine.on('$.ready', data => {
      console.log('CHATENGINE READY')
      console.log(data)
      console.log(ChatEngine)
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
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
