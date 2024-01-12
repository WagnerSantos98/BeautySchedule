import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br.js';

import { allHorarios, allServicos } from '../../store/modules/horario/actions';
import { useDispatch, useSelector } from 'react-redux';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Horarios = () => {

    const dispatch = useDispatch();
    const  { horarios } = useSelector((state) => state.horario)

    const diasSemanaData = [
        new Date(2024, 0, 4, 0, 0, 0, 0),
        new Date(2024, 0, 5, 0, 0, 0, 0),
        new Date(2024, 0, 6, 0, 0, 0, 0),
        new Date(2024, 0, 7, 0, 0, 0, 0),
        new Date(2024, 0, 8, 0, 0, 0, 0),
        new Date(2024, 0, 9, 0, 0, 0, 0),
        new Date(2024, 0, 10, 0, 0, 0, 0),
    ];
    const formatEvents = horarios.map((horario, index) => horario.dias.map((dia) => ({
        title: `${horario.especialidades.length} espec. e ${horario.colaboradores.length} colab.`,
        start: new Date(
            diasSemanaData[dia].setHours(
                parseInt(moment(horario.inicio).format('HH')),
                parseInt(moment(horario.inicio).format('mm'))
            )
        ),
        end: new Date(
            diasSemanaData[dia].setHours(
                parseInt(moment(horario.fim).format('HH')),
                parseInt(moment(horario.fim).format('mm'))
            )
        ),
    })));

    useEffect(() => {
        //Todos horários

        //Todos os serviços
        dispatch(allHorarios());
        dispatch(allServicos());
    }, []);

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Horários de atendimento</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    
                                }}
                            >
                                <span className="mdi mdi-plus">Novo colaborador</span>
                            </button>
                        </div>
                    </div>
                    <Calendar
                        localizer={localizer}
                        toolbar={false}
                        formats={{
                            dateFormat: 'dd',
                            dayFormat:(date, culture, localizer) => localizer.format(date, 'dddd', culture)
                        }}
                        popup
                        selectable
                        events={formatEvents}
                        date={diasSemanaData[moment().day()]}
                        view='week'
                        style={{ height: 600 }}
                    />
                </div>
            </div>
            
        </div>
    );
};

export default Horarios;