import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  // {} is default state
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
    //store enhancer
    // resposible for getting data from AsyncStorage sending to reducers
  )
  // thunk is only middleware for now
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
// watches for any change in state
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] }).purge();
//.purge empties saved state if run. just uncomment and refresh
export default store;
