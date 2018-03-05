import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
// install --save redux-persist@4
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case CLEAR_LIKED_JOBS:
    return [];

    case REHYDRATE:
      return action.payload.likedJobs || [];
      //action payload is entire state obj when app was running
      // taking just likedjobs
      // or [] so first time since first time app runs, likedjobs will be undefined

    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
      //returns new array with everything in it before and only unique elements

    default:
      return state;
  }
}
