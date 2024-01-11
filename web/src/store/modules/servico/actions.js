import types from "./types"

export function allServicos(){
    return {
        type: types.ALL_SERVICOS,
    };
}

export function updateServico(payload){
    return {
        type: types.UPDATE_SERVICO,
        payload
    };
}

export function filterServicos(){
    return {
        type: types.FILTER_SERVICOS,
    };
}

export function addServico(){
    return {
        type: types.ADD_SERVICO
    };
}

export function resetServico(){
    return {
        type: types.RESET_SERVICO,
    };
}

export function unlinkServico(){
    return {
        type: types.UNLINK_SERVICO,
    };
}
