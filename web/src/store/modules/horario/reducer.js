import { produce } from 'immer';
import types from './types';    

const INITIAL_STATE = {
    behavior: 'create',
    components: {
        drawer: false,
        confirmDelete: false,
        view: "week"
    },
    form:{ //Controlar o estado dos dormulários
        filtering: false,
        disabled: false,
        saving: false,
    },
    colaboradores: [],
    servicos: [],
    horarios: [],
    horario:{
        dias: [],
        inicio: '',
        fim: '',
        especialidades: [],
        colaboradores: [],
    },
};

function horario(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_HORARIO:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_HORARIO:{
            return produce(state, (draft) => {
                draft.horario = INITIAL_STATE.horario;
            });
        }
        default: return state;
    }
} 

export default horario;