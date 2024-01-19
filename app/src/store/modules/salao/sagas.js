import { takeLatest, all, call, put  } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';

import { updateSalao, updateServicos } from './actions';
import types from './types';


export function* getSalao(){
    try{
        const { data: res } = yield call(api.get, `/salao/${consts.salaoId}`);

        if(res.error){
            alert(err.message);
            return false;
        }
        yield put(updateSalao({
            ...res.salao, 
            distancia: res.distance,
            isOpened: res.isOpened,
        }));
    }catch(err){
        alert(err.message);
    }
}


export function* allServicos(){
    try{
        const { data: res } = yield call(api.get, `/servico/salao/${consts.salaoId}`);

        if(res.error){
            alert(err.message);
            return false;
        }
        yield put(updateServicos(res.servicos));
    }catch(err){
        alert(err.message);
    }
}

export default all([
    takeLatest(types.GET_SALAO, getSalao),
    takeLatest(types.ALL_SERVICOS, allServicos),
]);