import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


const localizer = momentLocalizer(moment);

const Agendamentos = () => {
    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mt-0">Agendamentos</h2>
                    <Calendar
                        localizer={localizer}
                        events={[
                            {
                            title: "Evento Teste", 
                            start: moment().toDate(), 
                            end: moment().add(90, 'minutes').toDate(),
                            }
                        ]}
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