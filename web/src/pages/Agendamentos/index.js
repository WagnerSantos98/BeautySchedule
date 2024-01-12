import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { filterAgendamentos } from '../../store/modules/agendamento/actions';
import util from '../../util';

import 'moment/locale/pt-br.js';


moment.locale('pt-br');
const localizer = momentLocalizer(moment);


const Agendamentos = () => {

    const dispatch = useDispatch();
    const { agendamentos } = useSelector((state) => state.agendamento)

    const formatEventos = agendamentos.map((agendamento) => ({
            title: `${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`, 
            start: moment(agendamento.data).toDate(), 
            end: moment(agendamento.data).add(util.hourToMinutes(moment(agendamento.servicoId.duracao).format('HH:mm')), 'minutes').toDate(),
    }));
    
    const formatRange = (periodo) => {
        let finalRange = {};
        if(Array.isArray(periodo)) {
            finalRange = {
                start: moment(periodo[0]).format('YYYY-MM-DD'),
                end: moment(periodo[periodo.length - 1]).format('YYYY-MM-DD'),
            };
        }else{
            finalRange = {
                start: moment(periodo.start).format('YYYY-MM-DD'),
                end: moment(periodo.end).format('YYYY-MM-DD'),
            };
        }
        return finalRange;
    }

    useEffect(() =>{
        dispatch(filterAgendamentos(
            moment().weekday(0).format('YYYY-MM-DD'),
            moment().weekday(6).format('YYYY-MM-DD')
        ));
    }, []);

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mt-0">Agendamentos</h2>
                    <Calendar
                        localizer={localizer}
                        onRangeChange={(periodo) => {
                            const { start, end } = formatRange(periodo)
                            dispatch(filterAgendamentos(start, end));
                        }}
                        events={formatEventos}
                        messages = {{
                            allDay: "Hoje",
                            previous: "Voltar",
                            next: "Próximo",
                            today: "Hoje",
                            month: "Mês",
                            week: "Semana",
                            day: "Dia",
                            agenda: "Agenda",
                            date: "Data",
                            time: "Hora",
                            event: "Evento",
                        }}
                        
                        defaultView="week"
                        selectable
                        popup
                        style={{ height: 600 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Agendamentos;