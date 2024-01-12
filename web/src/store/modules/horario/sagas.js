import { takeLatest, all, call, put, select, take} from 'redux-saga/effects';
import { updateHorario, allHorarios as allHorariosAction, resetHorario } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allHorarios() {
    const { form } = yield select((state) => state.horario);

    try {
        yield put(updateHorario({ form: { ...form, loading: true } }));

        const { data: res } = yield call(
            api.get, `/horario/salao/${consts.salaoId}`
        );
 
        yield put(updateHorario({ form: { ...form, loading: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(updateHorario({ horarios: res.horarios }));
    } catch (err) {
        yield put(updateHorario({ form: { ...form, loading: false } }));
        alert(err.message);
    }
}

export function* allServicos() {
    const { form } = yield select(
        (state) => state.horario
    );
    try{
        yield put(updateHorario({ form: { ...form, filtering: true }}));
        const { data: res } = yield call(
            api.get, `/salao/servicos/${consts.salaoId}`
        );
        yield put(updateHorario({ form: { ...form, filtering: false }}));
        if(res.error){
            alert(res.message);
            return false;
        }

        yield put(updateHorario({ servicos: res.servicos }));
    }catch(err){
        yield put(updateHorario({ form: { ...form, filtering: false }}));
        alert(err.message);
    }
}

export default all([
    takeLatest(types.ALL_HORARIOS, allHorarios),
    takeLatest(types.ALL_SERVICOS, allServicos),
    
]);