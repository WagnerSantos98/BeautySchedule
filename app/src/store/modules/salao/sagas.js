import { takeLatest, all, call, put  } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';

import { updateSalao } from './actions';
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
        }));
    }catch(err){
        alert(err.message);
    }
}

export default all([
    takeLatest(types.GET_SALAO, getSalao)
]);