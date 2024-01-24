import { produce } from 'immer';
import types from './types';    

const INITIAL_STATE = {
    behavior: 'create',
    isAuthenticated: false,
    components: {
        drawer: false,
        confirmDelete: false,
    },
    form:{ //Controlar o estado dos dormulários
        filtering: false,
        disabled: false,
        saving: false,
    },
    usuarios: [],
    usuario:{
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        vinculo: 'A',
        nivelAcesso: 'P'        
    },
};

function usuario(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_USUARIO:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_USUARIO:{
            return produce(state, (draft) => {
                draft.usuario = INITIAL_STATE.usuario;
            });
        }
        case types.LOGIN_USUARIO: {
            return produce(state, (draft) => {
                draft.usuario = action.usuario;
                draft.isAuthenticated = true;
                
            });
        }
        default: return state;
    }
} 

export default usuario;