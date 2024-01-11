import React from 'react';
import { useEffect } from 'react';
import { Button, Drawer, Modal, TagPicker } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector } from 'react-redux';
import { allColaboradores, updateColaborador, filterColaboradores, addColaborador, unlinkColaborador, allServicos } from '../../store/modules/colaborador/actions'


const Colaboradores = () => {

    const dispatch = useDispatch();
    const { colaboradores, colaborador, form, components, behavior, servicos } = useSelector((state) => state.colaborador);

    

    const setComponent = (component, state) => {
        dispatch(updateColaborador({
            components: { ...components, [component]: state }, 
        }));
    };

    const setColaborador = (key, value) => {
        dispatch(
            updateColaborador({
                colaborador: { ...colaborador, [key]: value },
            }));
    }

    const save = () => {
        dispatch(addColaborador());
    };

    const remove = () => {
        dispatch(unlinkColaborador());
    };

    useEffect(() => {
        dispatch(allColaboradores());
        dispatch(allServicos());
        
    },[]);

    return(
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
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atulizar' } colaborador</h3>
                    <div className="row mt-4">
                        <div className="form-group col-12 mb-3">
                            <b>Email</b>
                            <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email do colaborador" 
                                disabled={behavior === 'update'}
                                value={colaborador.email}
                                onChange={(e) => {
                                    setColaborador('email', e.target.value);
                                }}
                            />
                            {behavior === 'create' && (
                            <div className="input-group-append">
                                <Button 
                                    appearance="primary" 
                                    loading={form.filtering}
                                    disabled={form.filtering}
                                    onClick={() => {
                                        dispatch(filterColaboradores())
                                    }} 
                                >
                                    Pesquisar
                                </Button>
                            </div>
                            )}
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <b className="">Nome</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome do colaborador"
                                disabled={form.disabled}
                                value={colaborador.nome}
                                onChange={(e) => setColaborador('nome', e.target.value)}
                            />
                        </div>
                        
                            <div className="form-group col-6">
                                <b>Status</b>
                                <select
                                disabled={form.disabled && behavior === 'create'}
                                className="form-control"
                                value={colaborador.vinculo}
                                onChange={(e) =>
                                    setColaborador('vinculo', e.target.value)
                                }
                                >
                                    <option value="A">Ativo</option>
                                    <option value="I">Inativo</option>
                                </select>
                            </div>
                        <div className="form-group col-6 mt-3">
                            <b className="">Telefone | Whatshapp</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Telefone do colaborador"
                                disabled={form.disabled}
                                value={colaborador.telefone}
                                onChange={(e) => setColaborador('telefone', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6 mt-3">
                            <b className="">Data de Nascimento</b>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Data de Nascimento"
                                disabled={form.disabled}
                                value={colaborador.dataNascimento}
                                onChange={(e) => setColaborador('dataNascimento', e.target.value)}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <b>Especialidades</b>
                            <TagPicker
                                size="lg"
                                block
                                placeholder="Especialidades"
                                data={servicos}
                                disabled={form.disabled && behavior === 'create'}
                                defaultValue={colaborador.especialidades}
                                onChange={(especialidade) => setColaborador('especialidade', especialidade)}
                            />
                        </div>
                        
                    </div>
                <Button 
                    block
                    className="mt-3"
                    appearance="primary"
                    color={behavior === 'create' ? 'green' : 'primary'}
                    size="lg"
                    loading={form.saving}
                    onClick={() => save()}
                >
                    {behavior === 'create' ? 'Salvar' : 'Atualizar'} colaborador
                </Button>
                {behavior === 'update' && (
                <Button 
                    block
                    className="mt-3"
                    appearance="primary"
                    color="red"
                    size="lg"
                    loading={form.saving}
                    onClick={() => setColaborador('confirmDelete', true)}
                >
                    Remover Colaborador
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
                        <h2 className="mb-4 mt-0">Colaboradores</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    console.log("Click");
                                    dispatch(
                                        updateColaborador({
                                            behavior: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">Novo colaborador</span>
                            </button>
                        </div>
                    </div>
                    <Table
                    loading={form.filtering}
                    data={colaboradores}
                    config={[
                        { label: 'Nome', key: 'nome', width: 200, fixed: true},
                        { label: 'Email', key: 'email', width: 200},
                        { label: 'Telefone', key: 'telefone', width: 200},
                        { label: 'Data Cadastro', content: (colaborador) => moment(colaborador.dataCadastro).format('DD/MM/YYYY'), width: 200},
                    ]}
                    actions={(colaborador) => (
                        <Button color="primary" size="xs">Exibir informações</Button>
                    )}
                    onRowClick={(colaborador) => {
                        dispatch(
                            updateColaborador({
                                behavior: 'update',
                            })
                        );
                        dispatch(
                            updateColaborador({
                                colaborador,
                            })
                        );
                        setComponent('drawer', true);
                    }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Colaboradores;