import types from './types';
import { produce } from 'immer';

const INITIAL_STATE = {
    salao: {}
};

function salao(state = INITIAL_STATE, action){
    switch(action.type){

        case types.UPDATE_SALAO: {
            return produce(state, (draft) => {
                draft.salao = { ...draft.salao, ...action.salao};
            })
        }
        default:
            return state;
    }
}

export default salao;