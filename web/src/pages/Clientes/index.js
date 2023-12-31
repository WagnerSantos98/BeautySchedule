import React from 'react';
import { useEffect } from 'react';
import { Button, Drawer } from 'rsuite';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector } from 'react-redux';
import { allClientes, updateCliente } from '../../store/modules/cliente/actions'


const Clientes = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { clientes, form } = useSelector((state) => state.cliente);

    /*const setComponent = (component, state) => {
        dispatch(updateCliente({
            components: { ...components, [component]: state }
        }));
    } */

    useEffect(() => {
        dispatch(allClientes());
    },[]);

    return(
        <div className="col p-5 overflow-auto h-100">
            <Drawer 
            open={open} onClose={() => setOpen(false)}
            >
                <Drawer.Body>

                </Drawer.Body>
            </Drawer>

            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Clientes</h2>
                        <div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => setOpen(true)}
                                /*onClick={()=> {
                                    console.log('Hiding drawer');
                                    dispatch(updateCliente({
                                        behavior: 'create',
                                    }));

                                    setComponent('drawer', true)
                                }}*/
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
                    onRowClick={(cliente) => {alert(cliente.nome)}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Clientes;