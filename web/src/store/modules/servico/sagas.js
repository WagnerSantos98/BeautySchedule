import { takeLatest, all, call, put, select} from 'redux-saga/effects';
import { updateServico, allServicos as allServicosAction, resetServico } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allServicos() {
    const { form } = yield select((state) => state.servico);

    try {
        yield put(updateServico({ form: { ...form, loading: true } }));

        const { data: res } = yield call(
            api.get, `/servico/salao/${consts.salaoId}`
        );

        yield put(updateServico({ form: { ...form, loading: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(updateServico({ servicos: res.servicos }));
    } catch (err) {
        yield put(updateServico({ form: { ...form, loading: false } }));
        alert(err.message);
    }
}

export function* filterServicos() {
    const { form, servico } = yield select((state) => state.servico);

    try {
        yield put(updateServico({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.post, `/servico/filter/`,
            {
                filters: {
                    email: servico.email,
                    status: 'A'
                }
            }
        );

        yield put(updateServico({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        if (res.servicos.length > 0) {
            yield put(updateServico({
                servico: res.servicos[0], 
                form: { ...form, filtering: false, disabled: true } 
            }));
        } else {
            yield put(updateServico({ form: { ...form, disabled: false } }));
        }

    } catch (err) {
        yield put(updateServico({ form: { ...form, filtering: false } }));
        alert(err.message);
    }
}

export function* addServico() {
    const { form, servico, components, behavior } = yield select((state) => state.servico);

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));
        let res = {};

        if(behavior === 'create'){
            const response = yield call(
                api.post, `/servico`,
                {
                    salaoId: consts.salaoId,
                    servico
                }
            );
            res = response.date;
        }else{
            const response = yield call(
                api.put, `/servico/${servico._id}`,
                {
                    vinculo: servico.vinculo,
                    vinculoId: servico.vinculoId,
                    especialidades: servico.especialidades,
                }
            );
            res = response.data;
        }

        yield put(updateServico({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allServicosAction());
        yield put(updateServico({ components: { ...components, drawer: false } }));
        yield put(resetServico());

    } catch (err) {
        yield put(updateServico({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* unlinkServico() {
    const { form, servico, components } = yield select((state) => state.servico);

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));
        const { data: res } = yield call(
            api.delete, `/servico/vinculo/${servico.vinculoId}`
        );

        yield put(updateServico({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allServicosAction());
        yield put(updateServico({ components: { ...components, drawer: false, confirmDelete: false  } }));
        yield put(resetServico());

    } catch (err) {
        yield put(updateServico({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}



export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.FILTER_SERVICOS, filterServicos),
    takeLatest(types.ADD_SERVICO, addServico),
    takeLatest(types.UNLINK_SERVICO, unlinkServico)
])