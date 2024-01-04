import React from 'react';
import { FlatList } from 'react-native';
import Header  from '../../components/Header';
import theme from '../../styles/theme.json';
import util from '../../util';

const Home = () => {
    return(
        <FlatList
            style={{
                backgroundColor: util.toAlpha(theme.colors.muted)
            }} 
            ListEmptyComponent={Header}
            data={[]}
        />
    );
}

export default Home;