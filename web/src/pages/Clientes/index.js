import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Drawer, Modal } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector} from 'react-redux';
import { allClientes, updateCliente, filterClientes, addCliente, unlinkCliente } from '../../store/modules/cliente/actions'


const Clientes = () => {

    const dispatch = useDispatch();
    const { clientes, cliente, form, components, behavior } = useSelector((state) => state.cliente);
    const [dadosCarregados, setDadosCarregados] = useState(false);

    

    const setComponent = (component, state) => {
        dispatch(updateCliente({
            components: { ...components, [component]: state }, 
        }));
    };

    const setCliente = (key, value) => {
        dispatch(
            updateCliente({
                cliente: { ...cliente, [key]: value },
            }));
    }

    const save = () => {
        dispatch(addCliente());
    };

    const remove = () => {
        dispatch(unlinkCliente());
    };

    const checkCEP = (e) => {   
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
    
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCliente('endereco', {
                    ...cliente.endereco,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    uf: data.uf,
                    cidade: data.localidade
                })
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            }); 
            setDadosCarregados(true);
    };

    useEffect(() => {
        dispatch(allClientes());
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
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atulizar' } cliente</h3>
                    <div className="row mt-4">
                        <div className="form-group col-12 mb-3">
                            <b>Email</b>
                            <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email do cliente" 
                                value={cliente.email}
                                onChange={(e) => {
                                    setCliente('email', e.target.value);
                                }}
                            />
                            <div className="input-group-append">
                                <Button 
                                    appearance="primary" 
                                    loading={form.filtering}
                                    disabled={form.filtering}
                                    onClick={() => {
                                        dispatch(filterClientes())
                                    }} 
                                >
                                    Pesquisar
                                </Button>
                            </div>
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <b className="">Nome</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome do cliente"
                                disabled={form.disabled}
                                value={cliente.nome}
                                onChange={(e) => setCliente('nome', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className="">Telefone | Whatshapp</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Telefone do Cliente"
                                disabled={form.disabled}
                                value={cliente.telefone}
                                onChange={(e) => setCliente('telefone', e.target.value)}
                            />
                        </div>
                        <div className="form-group col-6 mt-3">
                            <b className="">Data de Nascimento</b>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Data de Nascimento"
                                disabled={form.disabled}
                                value={cliente.dataNascimento}
                                onChange={(e) => setCliente('dataNascimento', e.target.value)}
                            />
                        </div>

                        <div className="row mt-4">
                            <div className="form-group col-6">
                                <b>Tipo de Documento</b>
                                <select
                                disabled={form.disabled}
                                className="form-control"
                                value={cliente.documento ? cliente.documento.tipo : ''}
                                onChange={(e) =>
                                    setCliente('documento', {
                                        ...cliente.documento,
                                        tipo: e.target.value,
                                    })
                                }
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
                                    value={cliente.documento ? cliente.documento.numero : ''}
                                    onChange={(e) => setCliente('documento', {
                                        ...cliente.documento,
                                        numero: e.target.value,
                                    })
                                }
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
                                    value={cliente.endereco ? cliente.endereco.cep : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        cep: e.target.value,
                                    })
                                }
                                    onBlur={checkCEP}
                                />
                            </div>
                            <div className="form-group col-12 mt-3">
                                <b className="">Rua | Logradouro</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rua | Lougradouro"
                                    disabled={form.disabled || dadosCarregados}
                                    value={cliente.endereco ? cliente.endereco.logradouro : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        logradouro: e.target.value,
                                    })
                                }
                                />
                            </div>
                            <div className="form-group col-6 mt-3">
                                <b className="">Bairro</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Bairro"
                                    disabled={form.disabled || dadosCarregados}
                                    value={cliente.endereco ? cliente.endereco.bairro : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        bairro: e.target.value,
                                    })
                                }
                                />
                            </div>
                            <div className="form-group col-6 mt-3">
                                <b className="">Número</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número"
                                    disabled={form.disabled}
                                    value={cliente.endereco ? cliente.endereco.numero : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        numero: e.target.value,
                                    })
                                }
                                />
                            </div>
                            <div className="form-group col-3 mt-3">
                                <b className="">UF</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="UF"
                                    disabled={form.disabled || dadosCarregados}
                                    value={cliente.endereco ? cliente.endereco.uf : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        uf: e.target.value,
                                    })
                                }
                                />
                            </div>
                            <div className="form-group col-9 mt-3">
                                <b className="">Cidade</b>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cidade"
                                    disabled={form.disabled || dadosCarregados}
                                    value={cliente.endereco ? cliente.endereco.cidade : ''}
                                    onChange={(e) => setCliente('endereco', {
                                        ...cliente.endereco,
                                        cidade: e.target.value,
                                    })
                                }
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
                        <h2 className="mb-4 mt-0">Clientes</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    console.log("Click");
                                    dispatch(
                                        updateCliente({
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
                    data={clientes}
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
                            updateCliente({
                                behavior: 'update',
                            })
                        );
                        dispatch(
                            updateCliente({
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

export default Clientes;