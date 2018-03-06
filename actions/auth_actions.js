import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
// import RNRestart from 'react-native-restart';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOG_OUT
} from './types';
// import App from '../App';

import { FACEBOOK_API_KEY } from '../credentials';

//Asyncstorage lets react save data to phone; save token
// takes some amount to time to retrieve, returns promise when retrieve and save
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')

//if have single statement after => can drop {} and return
//since have only one argument passed to inner => can take off () of dispatch
// dispatch redux thunk; do async dispatch since two functions
export const facebookLogin = () => async dispatch => {
// lecture 99, 11:04
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      //dispatch action saying fb login done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      //start fb login process
      doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_API_KEY,
  { permissions: ['public_profile']
});
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
// above will pop a modal to take user name and password
// result has type and token property

export const FacebookLogOUt = (callback) => async (dispatch) => {
    await AsyncStorage.removeItem('fb_token');
    // dispatch(RNRestart.Restart());
    dispatch({ type: FACEBOOK_LOG_OUT });
    callback();
    // RNRestart.Restart();
};
