import { takeLatest, all, call, put, select} from 'redux-saga/effects';
import { updateSalao, allSaloes as allSaloesAction, resetSalao } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allSaloes() {
    const { form } = yield select((state) => state.salao);

    try {
        yield put(updateSalao({ form: { ...form, loading: true } }));

        const { data: res } = yield call(
            api.get, `/salao/${consts.salaoId}`
        );

        yield put(updateSalao({ form: { ...form, loading: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(updateSalao({ saloes: res.saloes }));
    } catch (err) {
        yield put(updateSalao({ form: { ...form, loading: false } }));
        alert(err.message);
    }
}

export function* filterSaloes() {
    const { form, salao } = yield select((state) => state.salao);

    try {
        yield put(updateSalao({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.post, `/salao/filter/`,
            {
                filters: {
                    email: salao.email,
                    status: 'A'
                }
            }
        );

        yield put(updateSalao({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        if (res.saloes.length > 0) {
            yield put(updateSalao({
                salao: res.saloes[0], 
                form: { ...form, filtering: false, disabled: true } 
            }));
        } else {
            yield put(updateSalao({ form: { ...form, disabled: false } }));
        }

    } catch (err) {
        yield put(updateSalao({ form: { ...form, filtering: false } }));
        alert(err.message);
    }
}

export function* addSalao() {
    const { form, salao, components } = yield select((state) => state.salao);

    try {
        yield put(updateSalao({ form: { ...form, saving: true } }));
        const { data: res } = yield call(
            api.post, `/salao`,
            {
                salaoId: consts.salaoId,
                salao
            }
        );

        yield put(updateSalao({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allSaloesAction());
        yield put(updateSalao({ components: { ...components, drawer: false } }));
        yield put(resetSalao());

    } catch (err) {
        yield put(updateSalao({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* unlinkSalao() {
    const { form, salao, components } = yield select((state) => state.salao);

    try {
        yield put(updateSalao({ form: { ...form, saving: true } }));
        const { data: res } = yield call(
            api.delete, `/salao/vinculo/${salao.vinculoId}`
        );

        yield put(updateSalao({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allSaloesAction());
        yield put(updateSalao({ components: { ...components, drawer: false, confirmDelete: false  } }));
        yield put(resetSalao());

    } catch (err) {
        yield put(updateSalao({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export default all([
    takeLatest(types.ALL_SALOES, allSaloes),
    takeLatest(types.FILTER_SALOES, filterSaloes),
    takeLatest(types.ADD_SALAO, addSalao),
    takeLatest(types.UNLINK_SALAO, unlinkSalao),
]);