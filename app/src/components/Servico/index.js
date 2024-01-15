import React from 'react';
import { Text, Box, Touchable, Cover, Title, Button } from '../../styles';

const servico = () => {
    return (
        <Touchable 
            height="100px" 
            hasPadding
            align="center" 
            background="light"
        >
            <Cover image="https://moda20.com.br/wp-content/uploads/2022/03/Protetor-Solar-Biore-AquaRich-Watery-Essence-e-bom_.jpg"/>
            <Box direction="column">
                <Text bold color="dark">Corte de cabelo feminino</Text>
                <Text small>R$ 45,00 • 30mins</Text>
            </Box>
            <Box>
                <Button icon="clock-check-outline" background="success" mode="contained">Agendar</Button>
            </Box>
        </Touchable>
    )
}

export default servico;