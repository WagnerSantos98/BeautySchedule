import types from "./types"

export function allSaloes(salao){
    return {
        type: types.ALL_SALOES,
        salao
    };
}

export function updateSalao(payload){
    return {
        type: types.UPDATE_SALAO,
        payload
    };
}

export function filterSaloes(){
    return {
        type: types.FILTER_SALOES,
    };
}

export function addSalao(){
    return {
        type: types.ADD_SALAO,
    };
}

export function resetSalao(){
    return {
        type: types.RESET_SALAO,
    };
}

export function unlinkSalao(){
    return {
        type: types.UNLINK_SALAO,
    };
}