import React from 'react';
import { Box, Text, Title, Spacer, Cover } from '../../styles';
import theme from '../../styles/theme.json';
import util from '../../util';
import consts from '../../consts';

const Resume = ({ agendamento, servicos }) => {
    const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];
    return (
        <Box align="center" hasPadding background={util.toAlpha(theme.colors.muted, 5)}>
            <Cover image={`${ consts.bucketUrl }/${servico?.arquivos[0]?.caminho}`} width="80px" height="80px"/>
            <Box direction="column">
                <Text  bold color="dark">{servico?.titulo}</Text>
                <Spacer size="4px"/>
                <Text small bold color="muted">Total: R$ {servico?.preco?.toFixed(2)} </Text>
            </Box>
        </Box>
    );
};

export default Resume;