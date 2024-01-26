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
    saloes: [],
    salao:{
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        documento:{
            tipo: 'cpf',
            numero: '',
        },
        endereco:{
            cidade: '',
            bairro: '',
            uf: '',
            cep: '',
            logradouro: '',
            numero: '',
        },
    },
};

function salao(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_SALAO:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_SALAO:{
            return produce(state, (draft) => {
                draft.salao = INITIAL_STATE.salao;
            });
        }
        default: return state;
    }
} 

export default salao;