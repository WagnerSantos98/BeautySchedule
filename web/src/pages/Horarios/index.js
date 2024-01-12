import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Drawer, TagPicker, DatePicker, Button, Modal } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br.js';

import { allHorarios, allServicos, updateHorario, filterColaboradores, addHorario, removeHorario } from '../../store/modules/horario/actions';
import { useDispatch, useSelector } from 'react-redux';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Horarios = () => {

    const dispatch = useDispatch();
    const  { horarios, horario, servicos, colaboradores, components, form, behavior } = useSelector((state) => state.horario);
    
    const diasSemanaData = [
        new Date(2024, 0, 4, 0, 0, 0, 0),
        new Date(2024, 0, 5, 0, 0, 0, 0),
        new Date(2024, 0, 6, 0, 0, 0, 0),
        new Date(2024, 0, 7, 0, 0, 0, 0),
        new Date(2024, 0, 8, 0, 0, 0, 0),
        new Date(2024, 0, 9, 0, 0, 0, 0),
        new Date(2024, 0, 10, 0, 0, 0, 0),
    ];

    const diasDaSemana = [
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
    ];

    const formatEvents = horarios.map((horario, index) => horario.dias.map((dia) => ({
        resource: horario,
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
    }))).flat();

    const setComponent = (component, state) => {
        dispatch(
            updateHorario({
                components: { ...component, [component]: state}
            })
        )
    }

    const setHorario = (key, value) => {
        dispatch(
            updateHorario({
                horario: { ...horario, [key]: value },
            })
        )
    }

    const save = () => {
        dispatch(addHorario());
    }

    const remove = () => {
        dispatch(removeHorario());
    };

    useEffect(() => {
        //Todos horários

        //Todos os serviços
        dispatch(allHorarios());
        dispatch(allServicos());
    }, []);

    useEffect(() => {
        dispatch(filterColaboradores());
    }, [horario.especialidades]);

    return (
        <div className="col p-5 overflow-auto h-100">
            <Drawer
                open={components.drawer}
                size="sm"
                onHide={() => {
                    setComponent('drawer', false);
                }}
                onClose={() => {
                    setComponent('drawer', false);
                }}
            >
                <Drawer.Body>
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atualizar'} horario de atendimento</h3>
                    <div className="row mt-3">
                        <div className="col-12">
                            <b>Dias da semana</b>
                            <TagPicker
                                size="lg"
                                block
                                value={horario.dias}
                                data={diasDaSemana.map((label, value) => ({ label, value }))}
                                onChange={(value) => {
                                    setHorario('dias', value);
                                }}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <b className="d-block">Horário inicial</b>
                            <DatePicker
                                block
                                format="HH:mm"
                                value={horario.inicio}
                                hideMinutes={(min) => ![0, 30].includes(min)}
                                onChange={(e) => {
                                    setHorario('inicio', e);
                                }}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <b className="d-block">Horário final</b>
                            <DatePicker
                                block
                                format="HH:mm"
                                value={horario.fim}
                                hideMinutes={(min) => ![0, 30].includes(min)}
                                onChange={(e) => {
                                    setHorario('fim', e);
                                }}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <b>Especialidades disponíveis</b>
                            <TagPicker
                                size="lg"
                                block
                                value={horario.especialidades}
                                data={servicos}
                                onChange={(e) => {
                                    setHorario('especialidades', e);
                                }}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <b>Colaboradores disponíveis</b>
                            <TagPicker
                                size="lg"
                                block
                                value={horario.colaboradores}
                                data={colaboradores}
                                onChange={(e) => {
                                    setHorario('colaboradores', e);
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        loading={form.saving}
                        appearance="primary"
                        color={behavior === 'create' ? 'green' : 'primary'}
                        size="lg"
                        block
                        onClick={() => save()}
                        className="mt-3"
                    >
                        Salvar horário de atendimento
                    </Button>
                    {behavior === 'update' && (
                    <Button 
                        block
                        className="mt-3"
                        appearance="primary"
                        color="red"
                        size="lg"
                        loading={form.saving}
                        onClick={() => setComponent('confirmDelete', true)}
                    >
                        Remover horário de atendimento
                    </Button>
                    )} 
                </Drawer.Body>
            </Drawer>
            <Modal
                open={components.confirmDelete}
                onHide={() => setComponent('confirmDelete', false)}
                size="xs"
            >
                <Modal.Body>
                    <RemindFill
                        style={{
                            color:'#ffb300',
                            fontSize: 24,
                        }}
                    />
                    {' '} Tem certeza que deseja excluir? Essa ação será irreversível!
                </Modal.Body>
                <Modal.Footer>
                    <Button  loading={form.saving} onClick={() => remove()} color="red" appearance="primary">
                        Sim, tenho certeza!
                    </Button>
                    <Button onClick={() => setComponent('confirmDelete', false)} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                <span className="mdi mdi-plus">Novo </span>
                            </button>
                        </div>
                    </div>
                    <Calendar
                        onSelectEvent={e => {
                            dispatch(updateHorario({
                                behavior: 'update',
                            }));
                            dispatch(updateHorario({
                               horario: e.resource,
                            }));
                            setComponent('drawer', true);
                        }}
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