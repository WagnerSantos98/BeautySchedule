import React from 'react';
import { Dimensions } from 'react-native';
import { Cover, GradientView, Title, Text, Badge, Box, Touchable, Button, TextInput } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.json';

const Header = () => {
    return(
        <>
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
                </GradientView>
            </Cover>
            <Box  background="light" align="center" width={Dimensions.get('window').width}>

                <Box hasPadding justify="space-between">
                    <Touchable direction="column" align="center" width="50px">
                        <Icon name="phone" size={24} color={theme.colors.muted}/>
                        <Text small spacing="10px 0 0">Ligar</Text>
                    </Touchable>
                    <Touchable direction="column" align="center" width="50px">
                        <Icon name="map-marker" size={24} color={theme.colors.muted}/>
                        <Text small spacing="10px 0 0">Visitar</Text>
                    </Touchable>
                    <Touchable direction="column" align="center" width="50px">
                        <Icon name="share" size={24} color={theme.colors.muted}/>
                        <Text small spacing="10px 0 0">Enviar</Text>
                    </Touchable>
                </Box>

                <Box hasPadding direction="column" align="center" justify="center">
                    <Button icon="clock-check-outline" background="success" mode="contained" uppercase={false}>Agendar Agora</Button>
                    <Text small spacing="10px 0 0">Horários disponíveis</Text>
                </Box>

            </Box>

            <Box hasPadding direction="column" background="light" spacing="10px 0 0">
                <Title small>Serviços (2)</Title>
                <TextInput placeholder="Digite o nome do serviço..."/>
            </Box>
        </>
    );

    
};

export default Header;