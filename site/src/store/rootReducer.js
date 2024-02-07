import { combineReducers } from 'redux';

import salao from './modules/salao/reducer';
import servico from './modules/servico/reducer';

export default combineReducers({
    salao,
    servico
});