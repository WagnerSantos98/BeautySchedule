import Reactotron from 'reactotron-react-native';
import AsyncStorage from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .use(reactotronRedux())
    .connect();

//console.tron.log
console.tron = Reactotron;
export default Reactotron;