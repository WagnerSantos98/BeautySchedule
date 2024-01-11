import React from 'react';
import { useEffect } from 'react';
import { Button, Drawer, Modal, TagPicker } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector } from 'react-redux';
import { allServicos, updateServico, filterServicos, addServico, unlinkServico } from '../../store/modules/servico/actions'


const Servicos = () => {

    const dispatch = useDispatch();
    const { servicos, servico, form, components, behavior } = useSelector((state) => state.servico);

    

    const setComponent = (component, state) => {
        dispatch(updateServico({
            components: { ...components, [component]: state }, 
        }));
    };

    const setServico = (key, value) => {
        dispatch(
            updateServico({
                servico: { ...servico, [key]: value },
            }));
    }

    const save = () => {
        dispatch(addServico());
    };

    const remove = () => {
        dispatch(unlinkServico());
    };

    useEffect(() => {
        dispatch(allServicos());
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
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atulizar' } servico</h3>
                    <div className="row mt-4">
                        <div className="form-group col-12 mb-3">
                            <b>Email</b>
                            <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email do servico" 
                                disabled={behavior === 'update'}
                                value={servico.email}
                                onChange={(e) => {
                                    setServico('email', e.target.value);
                                }}
                            />
                            {behavior === 'create' && (
                            <div className="input-group-append">
                                <Button 
                                    appearance="primary" 
                                    loading={form.filtering}
                                    disabled={form.filtering}
                                    onClick={() => {
                                        dispatch(filterServicos())
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
                                placeholder="Nome do servico"
                                disabled={form.disabled}
                                value={servico.nome}
                                onChange={(e) => setServico('nome', e.target.value)}
                            />
                        </div>
                        
                            <div className="form-group col-6">
                                <b>Status</b>
                                <select
                                disabled={form.disabled && behavior === 'create'}
                                className="form-control"
                                value={servico.vinculo}
                                onChange={(e) =>
                                    setServico('vinculo', e.target.value)
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
                                placeholder="Telefone do servico"
                                disabled={form.disabled}
                                value={servico.telefone}
                                onChange={(e) => setServico('telefone', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6 mt-3">
                            <b className="">Data de Nascimento</b>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Data de Nascimento"
                                disabled={form.disabled}
                                value={servico.dataNascimento}
                                onChange={(e) => setServico('dataNascimento', e.target.value)}
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
                                defaultValue={servico.especialidades}
                                onChange={(especialidade) => setServico('especialidade', especialidade)}
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
                    {behavior === 'create' ? 'Salvar' : 'Atualizar'} servico
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
                    Remover servico
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
                        <h2 className="mb-4 mt-0">Serviços</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    console.log("Click");
                                    dispatch(
                                        updateServico({
                                            behavior: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">Novo servico</span>
                            </button>
                        </div>
                    </div>
                    <Table
                    loading={form.filtering}
                    data={servicos}
                    config={[
                        { label: 'Título', key: 'titulo', width: 200, fixed: true},
                        { label: 'Email', key: 'email', width: 200},
                        { label: 'Telefone', key: 'telefone', width: 200},
                        { label: 'Data Cadastro', content: (servico) => moment(servico.dataCadastro).format('DD/MM/YYYY'), width: 200},
                    ]}
                    actions={(servico) => (
                        <Button color="primary" size="xs">Exibir informações</Button>
                    )}
                    onRowClick={(servico) => {
                        dispatch(
                            updateServico({
                                behavior: 'update',
                            })
                        );
                        dispatch(
                            updateServico({
                                servico,
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

export default Servicos;