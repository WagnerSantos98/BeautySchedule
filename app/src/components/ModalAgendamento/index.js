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
            snapPoints={[2, 70, Dimensions.get('screen').height - 30]}
            enablePanDownToClose={true}
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