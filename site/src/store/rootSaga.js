import { all } from 'redux-saga/effects';

import agendar from './modules/agendar/sagas';

export default function* rootSaga(){
    return yield all([agendar,]);
}