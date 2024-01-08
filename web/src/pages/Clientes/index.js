import { useEffect } from 'react';
import { Button } from 'rsuite';
import Table from '../../components/Table';
import moment from 'moment';
import { mockUsers } from './mock'; //Dados fakes para simulação
import 'rsuite/dist/rsuite.css';

import { useDispatch, useSelector } from 'react-redux';
import { allClientes } from '../../store/modules/cliente/actions'


const Clientes = () => {

    const dispatch = useDispatch();
    const { clientes } = useSelector((state) => state.clientes);

    useEffect(() => {
        dispatch(allClientes());
    },[]);

    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Clientes</h2>
                        <div>
                            <button className="btn btn-primary btn-lg">
                                <span className="mdi mdi-plus">Novo Cliente</span>
                            </button>
                        </div>
                    </div>
                    <Table 
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
                    onRowClick={(cliente) => {alert(cliente.firstName)}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Clientes;