import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';


export default combineReducers({
  auth, jobs, likedJobs
  // auth has token
  // just auth instead of auth: auth using es6
});
