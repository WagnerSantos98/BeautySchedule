import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import theme from '../../styles/theme.json';
import util from '../../util';

import { useDispatch, useSelector } from 'react-redux';
import { getSalao } from '../../store/modules/salao/actions';

import Header from '../../components/Header';
import Servico from '../../components/Servico';
import types from '../../store/modules/salao/types';
//import ModalAgendamento from '../../components/ModalAgendamento';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: types.GET_SALAO});
    },[]);
    
    return (
        <>
            <FlatList
                style={{
                    backgroundColor: util.toAlpha(theme.colors.muted, 5),
                }}
                ListHeaderComponent={Header}
                data={['a', 'b', 'c', 'd', 'e']}
                renderItem={({ item }) => <Servico key={item} />}
                keyExtractor={(item) => item}
            />
            
        </>
    );
};

export default Home;