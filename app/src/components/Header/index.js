import React from 'react';
import { Cover, GradientView, Title, Text, Badge } from '../../styles';

const Header = () => {
    return <Cover 
    image="https://s2.glbimg.com/Ha2q-YYa3pCWtwM4E51zi_p-POI=/940x523/e.glbimg.com/og/ed/f/original/2019/02/20/blow-dry-bar-del-mar-chairs-counter-853427.jpg"
    width="100%"
    height="300px">
        <GradientView 
            colors={['#21232f33', '#21232FE6']}
            hasPadding
            justify="flex-end"
        >
            <Badge color="success">ABERTO</Badge>
            <Title color="light">Salão Teste</Title>
            <Text color="light">Bragança Paulista • 5.2Kms</Text>
        </GradientView>
    </Cover>
}

export default Header;