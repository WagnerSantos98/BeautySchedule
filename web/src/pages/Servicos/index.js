import React from 'react';
import { useEffect } from 'react';
import { Button, Drawer, Modal, TagPicker, Tag, DatePicker, Uploader } from 'rsuite';
import RemindFill from '@rsuite/icons/RemindFill';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector } from 'react-redux';
import { allServicos, updateServico, addServico, removeServico } from '../../store/modules/servico/actions';
import consts from '../../consts';


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
        dispatch(removeServico());
    };

    useEffect(() => {
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
                    <h3>{behavior === 'create' ? 'Criar novo' : 'Atulizar' } serviço</h3>
                    <div className="row mt-3">
                        <div className="form-group col-6">
                            <b>Título</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Título do serviço"
                                value={servico.titulo}
                                onChange={(e) => {
                                    setServico('titulo', e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-3">
                            <b>Preço R$</b>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Preço do serviço"
                                value={servico.preco}
                                onChange={(e) => {
                                    setServico('preco', e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-3">
                            <b>Comissão %</b>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Comissão do serviço"
                                value={servico.comissao}
                                onChange={(e) => {
                                    setServico('comissao', e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-4">
                            <b>Recorrência</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Recorrência do serviço"
                                value={servico.recorrencia}
                                onChange={(e) => {
                                    setServico('recorrencia', e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-4">
                            <b className="">Duração</b>
                            <DatePicker
                                block
                                format="HH:mm"
                                value={servico.duracao}
                                hideMinutes={(min) => ![0, 30].includes(min)}
                                onChange={(e) => {
                                    setServico('duracao', e);
                                }}
                            />
                        </div>
                        <div className="form-group col-4">
                            <b>Status</b>
                            <select 
                                className="form-control"
                                value={servico.status}
                                onChange={(e) => setServico('status', e.target.value)}
                            >
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </select>
                        </div>
                        <div className="form-group col-12">
                            <b>Descrição</b>
                            <textarea 
                                className="form-control"
                                rows="5"
                                placeholder="Descrição do servico..."
                                value={servico.descricao}
                                onChange={(e) => setServico('descricao', e.target.value)}
                            >
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </textarea>
                        </div>
                        <div className="form-group col-12">
                            <b className="d-block">Imagens do serviço</b>
                            <Uploader 
                                multiple 
                                listType="picture" 
                                autoUpload={false}
                                defaultFileList={servico.arquivos.map((servico, index) => ({
                                    name: servico?.caminho,
                                    fileKey: index,
                                    url: `${consts.bucketUrl}/${servico?.caminho}`,
                                }))}
                                onChange={(files) => {
                                    console.log(files);
                                }}
                            >
                                <button>
                                    <CameraRetroIcon/>
                                </button>
                            </Uploader>
                        </div>
                    </div>                  
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
                                <span className="mdi mdi-plus">Novo Serviço</span>
                            </button>
                        </div>
                    </div>
                    <Table
                    loading={form.filtering}
                    data={servicos}
                    config={[
                        { label: 'Título', key: 'titulo', width: 200, fixed: true },
                        { label: 'Preço R$', content: (servico) => `R$ ${servico.preco.toFixed(2)}` },
                        { label: 'Comissão %', content: (servico) => `${servico.comissao}%` },
                        { label: 'Recorrência (Dias)', key: 'recorrencia', content: (servico) => `${servico.recorrencia} dias` },
                        { label: 'Duração', key: 'duracao', content: (servico) => moment(servico.duracao).format('HH:mm')},
                        { label: 'Status', key: 'status', content: (servico) => (<Tag color={servico.status === 'A' ? 'green' : 'red'}>{servico.status === 'A' ? 'Ativo' : 'Inativo'} </Tag>)},
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