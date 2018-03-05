import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  //check if token saved on device
  // AsyncStorage.removeItem('pushtoken');
  console.log(previousToken);

  if (previousToken) {
    return;
  } else {
    // ask for permissions; many permissions can be asked for
    // hey user, we want to send you push notifications; is that ok?
    // returns promise; pull off status property; inspect status
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }
    //token generation process; generates token for user's particular device
    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
};
