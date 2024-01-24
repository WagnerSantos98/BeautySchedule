import { takeLatest, all, call, put, select} from 'redux-saga/effects';
import { updateUsuario, allUsuarios as allUsuariosAction, resetUsuario, loginUsuario } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allUsuarios() {
    const { form } = yield select((state) => state.usuario);

    try {
        yield put(updateUsuario({ form: { ...form, loading: true } }));

        const { data: res } = yield call(
            api.get, `/usuario/salao/${consts.salaoId}`
        );

        yield put(updateUsuario({ form: { ...form, loading: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(updateUsuario({ usuarios: res.usuarios }));
    } catch (err) {
        yield put(updateUsuario({ form: { ...form, loading: false } }));
        alert(err.message);
    }
}

export function* filterUsuarios() {
    const { form, usuario } = yield select((state) => state.usuario);

    try {
        yield put(updateUsuario({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.post, `/usuario/filter/`,
            {
                filters: {
                    email: usuario.email,
                    status: 'A',
                    nivelAcesso: 'P'
                }
            }
        );

        yield put(updateUsuario({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        if (res.usuarios.length > 0) {
            yield put(updateUsuario({
                usuario: res.usuarios[0], 
                form: { ...form, filtering: false, disabled: true } 
            }));
        } else {
            yield put(updateUsuario({ form: { ...form, disabled: false } }));
        }

    } catch (err) {
        yield put(updateUsuario({ form: { ...form, filtering: false } }));
        alert(err.message);
    }
}

export function* addUsuario() {
    const { form, usuario, components } = yield select((state) => state.usuario);

    try {
        yield put(updateUsuario({ form: { ...form, saving: true } }));
        const { data: res } = yield call(
            api.post, `/usuario`,
            {
                salaoId: consts.salaoId,
                usuario
            }
        );

        yield put(updateUsuario({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allUsuariosAction());
        yield put(updateUsuario({ components: { ...components, drawer: false } }));
        yield put(resetUsuario());

    } catch (err) {
        yield put(updateUsuario({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* unlinkUsuario() {
    const { form, usuario, components } = yield select((state) => state.usuario);

    try {
        yield put(updateUsuario({ form: { ...form, saving: true } }));
        const { data: res } = yield call(
            api.delete, `/usuario/vinculo/${usuario.vinculoId}`
        );

        yield put(updateUsuario({ form: { ...form, saving: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(allUsuariosAction());
        yield put(updateUsuario({ components: { ...components, drawer: false, confirmDelete: false  } }));
        yield put(resetUsuario());

    } catch (err) {
        yield put(updateUsuario({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* loginUser(action){
    try{
        const { data: res } = yield call(api.post, '/usuario/login', {
            email: action.usuario.email,
            senha: action.usuario.senha,
        });
        if(res.error){
            alert(res.message);
            return false;
        }
        yield put(loginUsuario({ email: action.usuario.email, senha: action.usuario.senha }));
    }catch(err){
        alert(err.message);
    }
}

export default all([
    takeLatest(types.ALL_USUARIOS, allUsuarios),
    takeLatest(types.FILTER_USUARIOS, filterUsuarios),
    takeLatest(types.ADD_USUARIO, addUsuario),
    takeLatest(types.UNLINK_USUARIO, unlinkUsuario),
    takeLatest(types.LOGIN_USUARIO, loginUser)
]);