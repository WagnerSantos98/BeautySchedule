import React from 'react';
import { FlatList } from 'react-native';
import theme from '../../styles/theme.json';
import util from '../../util';

import Header from '../../components/Header';
import Servico from '../../components/Servico';
import ModalAgendamento from '../../components/ModalAgendamento';

const Home = () => {
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
            <ModalAgendamento/>
        </>
    );
};

export default Home;