import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView, Dimensions } from 'react-native';
import ModalHeader from './header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ModalAgendamento = () => {
    return (
        <GestureHandlerRootView>
            <BottomSheet
            initialSnap={1}
            snapPoints={[30, 70, Dimensions.get('window').height - 30]}
            renderContent={() => (
                <ScrollView style={{backgroundColor: '#fff'}}>
                    <ModalHeader/>
                </ScrollView>
            )}
            />
        </GestureHandlerRootView>
    );
};

export default ModalAgendamento;