import {
  FETCH_JOBS
} from '../actions/types';

const INITIAL_STATE = {
  results: []
};
// avoids errors in case nothing returned by query

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;

    default:
      return state;
  }
}
