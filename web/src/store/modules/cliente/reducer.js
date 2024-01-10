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
    clientes: [],
    cliente:{
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
            uf: '',
            cep: '',
            logradouro: '',
            numero: '',
        },
    },
};

function cliente(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_CLIENTE:{
            return produce(state, (draft) => {
                Object.assign(draft, action.payload);
            });
        }
        case types.RESET_CLIENTE:{
            return produce(state, (draft) => {
                draft.cliente = INITIAL_STATE.cliente;
            });
        }
        default: return state;
    }
} 

export default cliente;