import React from 'react';
import { Touchable, GradientView, Text, Spacer, Box } from '../../styles';
import { View, StyleSheet } from 'react-native';
import theme from '../../styles/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <GradientView colors={[themes.colors.dark, theme.colors.primary]}>
                <Box>
                    <Touchable>
                        <Icon name="chevron-left" color={theme.colors.light} size={30}/>
                        <View>
                            <Text>Finalizar Agendamento</Text>
                            <Text small>Horário, pagamento e especialista.</Text>
                        </View>
                    </Touchable>
                </Box>
            </GradientView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        width: '100%',
        height: 70
    }
});

export default ModalHeader;