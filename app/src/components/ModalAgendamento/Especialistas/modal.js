import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-simple-modal';
import { Dimensions } from 'react-native';

import { Box, Text, Cover, Touchable } from '../../../styles';
import theme from '../../../styles/theme.json';
import util from '../../../util';

const EspecialistasModal = () => {
    return(
        <Modal
            open={false}
        >
            <ScrollView>
                <Box hasPadding direction="column"> 
                    <Text bold color="dark">Corte de cabelo feminino</Text>
                    <Text small color="dark">Disponíveis em 15/01/2024 (Ter) às 11:30</Text>
                    <Box wrap="wrap" spacing="10px 0 0">
                        {[1,2,3,4,5,6,7,8,9].map(colaborador => (
                            <Touchable 
                                width={(Dimensions.get('screen').width - 100) / 4}
                                height="70px"
                                spacing="10px 0px 0px 0px"
                                direction="column"
                                align="center"
                            >
                                <Cover width="45px" height="45px" circle border={colaborador === 1 ? `2px solid ${theme.colors.primary}` : 'none'} spacing="0px 0px 5px 0px"/>
                                <Text small bold>Juliana</Text>
                            </Touchable>
                        ))}
                    </Box>
                </Box>
            </ScrollView>
        </Modal>
    );
};

export default EspecialistasModal;