import React from 'react';
import {AppRegistry} from 'react-native';
import Home from './src/pages/Home';
import {name as appName} from './app.json';

import { Provider as StorProvider} from 'react-redux';
import { DefaultTheme, configureFonts, Proveider as PaperProveider} from 'react-native-paper'; //Estilização do app
import store from './src/store';

const theme = {
    ...DefaultTheme,
    fonts: configureFonts({
        ios: ,
        android: ,
    })
}

const App = () => {
    return (
        <StorProvider store={store}>
            <PaperProveider>
                <Home/>
            </PaperProveider>
        </StorProvider>
    )
}

AppRegistry.registerComponent(appName, () => Home);
