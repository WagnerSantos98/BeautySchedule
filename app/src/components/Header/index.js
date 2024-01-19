import React from 'react';
import { Cover, GradientView, Title, Text, Badge, Box, Touchable, Button, TextInput } from '../../styles';
import { Linking, Share } from 'react-native';

//Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.json';

import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../../store/modules/salao/actions';

const Header = () => {
    const dispatch = useDispatch();
    const { salao, servicos } = useSelector((state) => state.salao);
    
    return (
    <>
        <Cover 
            image={salao?.capa}
            width="100%"
            height="300px">
            <GradientView 
                colors={['#21232f33', '#21232FE6']}
                hasPadding
                justify="flex-end"
            >
                <Badge color={salao.isOpened ? 'success' : 'danger'}>{salao.isOpened ? 'ABERTO' : 'FECHADO'}</Badge>
                <Title color="light">{salao.nome}</Title>
                <Text color="light">{salao?.endereco?.cidade} • {salao?.distancia?.toFixed(2)}Kms</Text>
            </GradientView>
        </Cover>
        <Box background="light" align="center">
            <Box justify="space-between" hasPadding>
                <Touchable width="40px" direction="column" align="center" spacing="0px 10px 0 0" onPress={() => Linking.openURL(`tel:${salao.telefone}`)}>
                    <Icon name="phone" size={24} color={theme.colors.muted}/>
                    <Text small spacing="10px 0 0">Ligar</Text>
                </Touchable>
                <Touchable width="60px" direction="column" align="center" onPress={() => {
                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=mnavigate&destination=${salao.geo.coordinates[0]},${salao.geo.coordinates[1]}`);
                }}>
                    <Icon name="map-marker" size={24} color={theme.colors.muted}/>
                    <Text small spacing="10px 0 0">Visitar</Text>
                </Touchable>
                <Touchable width="60px" direction="column" align="center" onPress={() => {Share.share({message: `${salao.nome} - Olá`})}}>
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
            <Title small>Serviços ({servicos.length})</Title>
            <TextInput 
            placeholder="Digite o nome do serviço..." 
            onChangeText={(value) => dispatch(updateForm({ inputFiltro: value }))}
            onFocus={() => dispatch(updateForm({ inputFiltroFoco: true }))}   
            onBlur={() => dispatch(updateForm({ inputFiltroFoco: false }))}            
            />
        </Box>
    </>
    );
};

export default Header;