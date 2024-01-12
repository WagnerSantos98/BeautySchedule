import { all } from 'redux-saga/effects';

import agendamento from './modules/agendamento/sagas';
import clientes from './modules/cliente/sagas';
import colaboradores from './modules/colaborador/sagas';
import servicos from './modules/servico/sagas';
import horarios from './modules/horario/sagas';

export default function* rootSaga(){
    return yield all([agendamento, clientes, colaboradores, servicos, horarios]);
}