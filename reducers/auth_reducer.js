import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOG_OUT
 } from '../actions/types';


export default function (state = {}, action) {
  switch (action.type) {

    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };

    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
      // most likely not going to use

    case FACEBOOK_LOG_OUT:
      return {};

    default:
      return state;
  }
}
