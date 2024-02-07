const INITAL_STATE = {
    agendar: [],
};

function agendar(state = INITAL_STATE, action){
    switch(action.type){
        case '@agendamento/ALL': {
            //
        }
        default:
            return state;
    }
}

export default agendar;