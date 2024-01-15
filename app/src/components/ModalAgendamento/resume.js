import React from 'react';
import { Box, Text, Title, Spacer, Cover } from '../../styles';
import theme from '../../styles/theme.json';
import util from '../../util';

const Resume = () => {
    return (
        <Box align="center" hasPadding background={util.toAlpha(theme.colors.muted, 5)}>
            <Cover image="https://moda20.com.br/wp-content/uploads/2022/03/Protetor-Solar-Biore-AquaRich-Watery-Essence-e-bom_.jpg" width="80px" height="80px"/>
            <Box direction="column">
                <Text  bold color="dark">Corte de cabelo feminino</Text>
                <Spacer size="4px"/>
                <Text small bold color="muted">Total: R$ 45,00 </Text>
            </Box>
        </Box>
    );
};

export default Resume;