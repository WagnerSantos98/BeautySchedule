import { takeLatest, all, call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';

import types from './types';
import { updateSalao } from './actions';

export function* getSalao(){
    try{

        const { data: res } = yield call(api.get, `/salao/${consts.salaoId}`);

        if(res.error){
            alert(res.message);
            return false;
        }

        yield put(updateSalao(res.salao));
    }catch(err){
        alert(err.message);
    }
}

export default all([
    takeLatest(types.GET_SALAO, getSalao),
]);