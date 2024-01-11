import { produce } from 'immer';
import types from './types';    

const INITIAL_STATE = {
    behavior: 'create',
    components: {
        drawer: false,
        confirmDelete: false,
    },
    form:{ //Controlar o estado dos dormulários
        filtering: false,
        disabled: false,
        saving: false,
    },
    servicos: [],
    servico:{
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        vinculo: 'A',
        especialidades: []
    },
};

function servico(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_SERVICO:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_SERVICO:{
            return produce(state, (draft) => {
                draft.servico = INITIAL_STATE.servico;
            });
        }
        default: return state;
    }
} 

export default servico;