import React from 'react';
import { Box, Text, Cover, Button } from '../../../styles';
import theme from '../../../styles/theme.json';
import util from '../../../util';

const EspecialistaPicker = () => {
    return(
        <>
            <Text bold color="dark" hasPadding removePaddingBottom>Gostaria de trocar o(a) especialista?</Text>
            <Box  hasPadding removePaddingBottom>
                <Box align="center">
                    <Cover width="45px" height="45px" circle image="https://img.freepik.com/fotos-premium/cabeleireiro-profissional-fica-em-um-salao-de-beleza-com-um-secador-de-cabelo-na-mao_2221-4638.jpg"/>
                    <Text small>Juliana</Text> 
                </Box>
                <Box>
                    <Button
                        uppercase={false}
                        textColor={theme.colors.muted}
                        background={theme.colors.light}
                        mode="contained"
                        block
                    >Trocar especialista</Button>
                </Box>
            </Box>
            
            
        </>
    );
};

export default EspecialistaPicker;