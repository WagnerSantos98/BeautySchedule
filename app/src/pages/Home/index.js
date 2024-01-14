import React from 'react';
import { FlatList } from 'react-native';
import Header from '../../components/Header';

const Home = () => {
    return(
        <FlatList
            ListEmptyComponent={Header}
            data={[]}
        />
    );
};

export default Home;