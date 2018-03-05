import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
// import RNRestart from 'react-native-restart';

import * as actions from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0,
        // paddingBottom: 10
    }
  }
  // android specific fix

  onButtonPress = () => {
    // this.props.navigation.navigate('settings');
    // this.props.FacebookLogOUt();
    this.props.FacebookLogOUt(() => {
      this.props.navigation.navigate('settings');
      // RNRestart.Restart();
    //   //passing call back to fetch jobs and then navigate
    });
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedJobs}
        />
      <View style={{ marginTop: 10 }}>
          <Button
          title="Log Out -- just logs out"
          large
          // icon={{ name: 'delete-forever' }}
          backgroundColor="#FFBB00"
          onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
