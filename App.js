import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
// binds react and redux; provider is react Component takes store as prop
// absolute root component of app
import Expo, { Notifications } from 'expo';

import store from './store';

import registerForPushNotifications from './services/push_notifications';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForPushNotifications();
    Notifications.addListener((notification) => {
      // listerner for anytime when user gets push notification
      // show alert; add Alert from RN
      const { data: { text }, origin } = notification;
      // like const text = notification.data.text
      // origin makes sure receiving notification properly; only origin === 'received'
      // learn more about origin, depends on Platform
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'OK.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          // swipeEnabled: false,
          //tabBarPosition and swipeEnabled are for android
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
        //second argument configuration options to TabNavigator
      }
    }, {

      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true

    });
//a routing obj and config at end

//don't wrap MainNavigator in view
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
