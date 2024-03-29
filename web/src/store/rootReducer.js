import { combineReducers } from 'redux';

import agendamento from './modules/agendamento/reducer';
import cliente from './modules/cliente/reducer';
import colaborador from './modules/colaborador/reducer';
import servico from './modules/servico/reducer';
import horario from './modules/horario/reducer';
import usuario from './modules/usuario/reducer';
import salao from './modules/salao/reducer';


export default combineReducers({
    agendamento,
    cliente,
    colaborador,
    servico,
    horario,
    usuario,
    salao
});