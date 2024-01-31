const INITAL_STATE = {
    agendamento: [],
};

function agendamento(state = INITAL_STATE, action){
    switch(action.type){
        case '@agendamento/ALL': {
            //
        }
        default:
            return state;
    }
}

export default agendamento;