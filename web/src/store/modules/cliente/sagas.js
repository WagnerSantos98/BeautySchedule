import { takeLatest, all, call, put, select} from 'redux-saga/effects';
import { updateCliente } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allClientes(){
    const { form } = yield select((state) => state.cliente);
    try{
        yield put(updateCliente({form: {...form, filtering: true} }));
        const {data: res} = yield call(
            api.get, `/cliente/salao/${consts.salaoId}`
        );

        yield put(updateCliente({form: {...form, filtering: false} }));

        if(res.error){
            alert(res.message);
            return false;
        }
        yield put(updateCliente(({ clientes: res.clientes })));
    }catch(err){
        yield put(updateCliente({form: {...form, filtering: false} }));
        alert(err.message);
    }
}

export default all([takeLatest(types.ALL_CLIENTES, allClientes)]);