import { all } from 'redux-saga/effects';

import salao from './modules/salao/sagas';
import servicos from './modules/servico/sagas';

export default function* rootSaga(){
    return yield all([salao, servicos]);
}