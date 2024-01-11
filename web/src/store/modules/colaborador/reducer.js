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
    colaboradores: [],
    servicos: [],
    colaborador:{
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        vinculo: 'A',
        especialidades: []
    },
};

function colaborador(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_COLABORADOR:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_COLABORADOR:{
            return produce(state, (draft) => {
                draft.colaborador = INITIAL_STATE.colaborador;
            });
        }
        default: return state;
    }
} 

export default colaborador;