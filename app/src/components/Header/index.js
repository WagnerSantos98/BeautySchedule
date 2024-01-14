import React from 'react';
import { Cover, GradientView, Title, Text, Badge, Box, Touchable, Button } from '../../styles';

//Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.json';

const Header = () => {
    return (
    <>
        <Cover 
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
        <Box background="light" align="center" hasPadding>
            <Box justify="space-between">
                <Touchable width="50px" direction="column" align="center">
                    <Icon name="phone" size={24} color={theme.colors.muted}/>
                    <Text small spacing="10px 0 0">Ligar</Text>
                </Touchable>
                <Touchable width="60px" direction="column" align="center">
                    <Icon name="map-marker" size={24} color={theme.colors.muted}/>
                    <Text small spacing="10px 0 0">Visitar</Text>
                </Touchable>
                <Touchable width="60px" direction="column" align="center">
                    <Icon name="share" size={24} color={theme.colors.muted}/>
                    <Text small spacing="10px 0 0">Enviar</Text>
                </Touchable>
            </Box>
            <Box hasPadding direction="column" width="100%" align="center" justify="center">
            <Button icon="clock-check-outline" background="success" mode="contained">Agendar Agora</Button>
                <Text small spacing="10px 0 0">Horários disponíveis</Text>
            </Box>
        </Box>
    </>
    );
};

export default Header;