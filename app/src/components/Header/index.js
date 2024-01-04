import React from 'react';
import { Cover, GradientView, Title, Text, Badge } from '../../styles';

const Header = () => {
    return(
        <Cover 
            image="https://images.adsttc.com/media/images/6013/8f05/f91c/8125/1500/02d2/large_jpg/Roby_Salao_Beleza-3774.jpg?1611894525"
            width="100%"
            height="300px">
            <GradientView 
                colors={['#21232F33', '#21232FE6']}
                hasPadding
                justify="flex-end"
            >
                <Badge color="success">ABERTO</Badge>
                <Title color="light">Salão Teste</Title>
                <Text color="light">Bragança Paulista • 5.2Kms</Text>
                <Text color="light">Wagner Santos</Text>
            </GradientView>
            </Cover>
    );

    
};

export default Header;