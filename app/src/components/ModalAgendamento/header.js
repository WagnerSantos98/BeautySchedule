import React from 'react';
import { Touchable, GradientView, Text, Spacer, Box } from '../../styles';
import { View, StyleSheet } from 'react-native';
import theme from '../../styles/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Gesture, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const ModalHeader = () => {
    const pan = Gesture.Pan().onChange((event) => {
        console.log(event)
    })
    return(
        <GestureHandlerRootView>
            <PanGestureHandler >
                <View style={styles.headerContainer}>
                    <GradientView 
                    colors={[theme.colors.dark, theme.colors.primary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    > 
                        <Box align="center">
                            <Touchable hasPadding>
                                <View>
                                <Icon name="drag-horizontal" color={theme.colors.light} size={24} style={{ marginLeft: '68%'}}/>  
                                    <Text color="light">Finalizar Agendamento</Text>
                                    <Spacer size="3px"/>
                                    <Text small color="light">Horário, pagamento e especialista.</Text>
                                </View>
                            </Touchable>
                        </Box>
                    </GradientView>
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 70
    }
})

export default ModalHeader;