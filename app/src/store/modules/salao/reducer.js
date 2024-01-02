import types from './types';
import produce from 'immer';

const INITIAL_STATE ={
    salao: {},
    servicos: [],
    agenda: [],
    colaboradores: [],
    agendamento:{
        clienteId: consts.clienteId,
        salaoId: consts.salaoId,
        servicoID: null,
        colaboradorId: null,
        data: null,
    },
    form:{
        inputFiltro: '',
        inputFiltroFoco: false,
        modalEspecialistas: false,
        modalAgendamento: 0,
        agendamentoLoading: false,
    },
};