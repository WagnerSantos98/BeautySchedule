import React from 'react';
import { Text, Box, Touchable, Cover, Button } from '../../styles';
import moment from 'moment';
import consts from '../../consts';

const servico = ({ servico }) => {
    return (
        <Touchable 
            height="100px" 
            hasPadding
            align="center" 
            background="light"
        >
            <Cover image={`${ consts.bucketUrl }/${servico?.arquivos[0]?.caminho}`}/>
            <Box direction="column">
                <Text bold color="dark">{servico.titulo}</Text>
                <Text small>R$ {servico?.preco?.toFixed(2)} • {moment(servico.duracao).format('HH:mm')} mins</Text>
            </Box>
            <Box>
                <Button icon="clock-check-outline" background="success" mode="contained">Agendar</Button>
            </Box>
        </Touchable>
    )
}

export default servico;