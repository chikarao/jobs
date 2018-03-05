import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome \nto the\nSamurai Jobs \nApp!', color: '#03A0F4' },
  { text: 'If you are a \nronin, \nuse this \nto get a job \nas a Samurai \nwhere you want.',
  color: '#009688' },
  { text: 'Set your location, \nthen swipe away! \n\nSign in to use the app!', color: '#03A0F4' }
];

class WelcomeScreen extends Component {
  state = { token: null };
  // null since we do not know if token exists
async componentWillMount() {
  let token = await AsyncStorage.getItem('fb_token');
  // this.setState({ token });
  AsyncStorage.removeItem('fb_token');
  // do removeItme to log off

  if (token) {
    this.props.navigation.navigate('map');
    // this.setState({ token });
  } else {
    this.setState({ token: false });
  }
  //
}
  // onSlidesComplete() {
  // need .bind(this)
  // }
  onSlidesComplete = () => {
    // navigation paased in props
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    // do not wrap with view...
    return (
      // <View>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete}
        />
      // </View>
    );
  }
}

export default WelcomeScreen;
