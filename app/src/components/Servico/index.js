import React from 'react';
import { Text, Box, Touchable, Cover, Title, Button } from '../../styles';

const Servico = () => {
    return(
        <Touchable height="100px" hasPadding align="center" background="light">
            <Cover image="https://moda20.com.br/wp-content/uploads/2023/01/cropped-Patricinha-Esperta-1200-e1673213811296.jpeg"/>
            <Box direction="column">
                <Text bold color="dark">Corte de cabelo feminino</Text>
                <Text small>R$45,00 • 30 mins</Text>
            </Box>
            <Box>
                <Button icon="clock-check-outline" background="success" mode="contained">AGENDAR</Button>
            </Box>
        </Touchable>
    );
};

export default Servico; 