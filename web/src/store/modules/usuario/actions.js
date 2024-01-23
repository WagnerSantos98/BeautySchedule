import types from "./types"

export function allUsuarios(){
    return {
        type: types.ALL_USUARIOS,
    };
}

export function updateUsuario(payload){
    return {
        type: types.UPDATE_USUARIO,
        payload
    };
}

export function filterUsuarios(){
    return {
        type: types.FILTER_USUARIOS,
    };
}

export function addUsuario(){
    return {
        type: types.ADD_USUARIO,
    };
}

export function resetUsuario(){
    return {
        type: types.RESET_USUARIO,
    };
}

export function unlinkUsuario(){
    return {
        type: types.UNLINK_USUARIO,
    };
}

export function loginUsuario(usuario){
    return {
        type: types.LOGIN_USUARIO,
        usuario
    }
}