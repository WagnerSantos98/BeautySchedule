import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Drawer, Modal } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector} from 'react-redux';
import { allUsuarios, updateUsuario, filterUsuarios, addUsuario, unlinkUsuario } from '../../store/modules/usuario/actions'


const Usuarios = () => {

    const dispatch = useDispatch();
    const { usuarios, usuario, form, components, behavior } = useSelector((state) => state.usuario);

    const setComponent = (component, state) => {
        dispatch(updateUsuario({
            components: { ...components, [component]: state }, 
        }));
    };

    const setUsuario = (key, value) => {
        dispatch(
            updateUsuario({
                usuario: { ...usuario, [key]: value },
            }));
    }

    const save = () => {
        dispatch(addUsuario());
    };

    const remove = () => {
        dispatch(unlinkUsuario());
    };

    
    useEffect(() => {
        dispatch(allUsuarios());
    },[dispatch]);

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
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atulizar' } usuário</h3>
                    <div className="row mt-4">
                        <div className="form-group col-12 mb-3">
                            <b>Email</b>
                            <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email do usuário" 
                                disabled={behavior === 'update'}
                                value={usuario.email}
                                onChange={(e) => {
                                    setUsuario('email', e.target.value);
                                }}
                            />
                            {behavior === 'create' && (
                            <div className="input-group-append">
                                <Button 
                                    appearance="primary" 
                                    loading={form.filtering}
                                    disabled={form.filtering}
                                    onClick={() => {
                                        dispatch(filterUsuarios())
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
                                placeholder="Nome do cliente"
                                disabled={form.disabled}
                                value={usuario.nome}
                                onChange={(e) => setUsuario('nome', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className="">Telefone | Whatshapp</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Telefone do Cliente"
                                disabled={form.disabled}
                                value={usuario.telefone}
                                onChange={(e) => setUsuario('telefone', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6 mt-3">
                            <b className="">Data de Nascimento</b>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Data de Nascimento"
                                disabled={form.disabled}
                                value={usuario.dataNascimento}
                                onChange={(e) => setUsuario('dataNascimento', e.target.value)}
                            />
                        </div>

                        <div className="row mt-4">
                            <div className="form-group col-6">
                                <b>Tipo de Documento</b>
                                <select
                                disabled={form.disabled}
                                className="form-control"
                                
                                >
                                    <option value="cpf">CPF</option>
                                    <option value="cnpj">CNPJ</option>
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <b className="">Número do documento</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número do documento"
                                    disabled={form.disabled}
                                    
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="form-group col-4">
                                <b className="">CEP</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="CEP"
                                    disabled={form.disabled}
                                    
                                    
                                />
                            </div>
                            <div className="form-group col-12 mt-3">
                                <b className="">Rua | Logradouro</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rua | Lougradouro"
                                    
                                    
                                />
                            </div>
                            <div className="form-group col-6 mt-3">
                                <b className="">Bairro</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Bairro"
                                    
                                    
                                />
                            </div>
                            <div className="form-group col-6 mt-3">
                                <b className="">Número</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número"
                                    disabled={form.disabled}
                                   
                                />
                            </div>
                            <div className="form-group col-3 mt-3">
                                <b className="">UF</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="UF"
                                    
                                    
                                />
                            </div>
                            <div className="form-group col-9 mt-3">
                                <b className="">Cidade</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cidade"
                                    
                                   
                                />
                            </div>
                        </div>
                        
                    </div>
                    <Button
                        block
                        className="mt-3"
                        appearance="primary"
                        color={behavior === 'create' ? 'green' : 'red'}
                        size="lg"
                        loading={form.saving}
                        onClick={() => {
                            if(behavior === 'create'){
                                save();
                            }else{
                                setComponent('confirmDelete', true);
                            }
                        }}
                    >
                        {behavior === 'create' ? 'Salvar' : 'Remover'} Cliente
                    </Button>
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
                        <h2 className="mb-4 mt-0">Usuários</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    console.log("Click");
                                    dispatch(
                                        updateUsuario({
                                            behavior: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">Novo Cliente</span>
                            </button>
                        </div>
                    </div>
                    <Table
                    loading={form.filtering}
                    data={usuarios}
                    config={[
                        { label: 'Nome', key: 'nome', width: 200, fixed: true},
                        { label: 'Email', key: 'email', width: 200},
                        { label: 'Telefone', key: 'telefone', width: 200},
                        { label: 'Data Cadastro', content: (cliente) => moment(cliente.dataCadastro).format('DD/MM/YYYY'), width: 200},
                    ]}
                    actions={(cliente) => (
                        <Button color="primary" size="xs">Exibir informações</Button>
                    )}
                    onRowClick={(cliente) => {
                        dispatch(
                            updateUsuario({
                                behavior: 'update',
                            })
                        );
                        dispatch(
                            updateUsuario({
                                cliente,
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

export default Usuarios;