import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

// shows nothing and just takes user to FB login
class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    // AsyncStorage.removeItem('fb_token');
    //removeItem to log off
  }
  //   this.onAuthComplete(this.props); not really necessary
  // since facebookLogin is asynchronous

componentWillReceiveProps(nextProps) {
  this.onAuthComplete(nextProps);
}
// called when just about to be rerendered
// for when user succesfully logs into FB

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
