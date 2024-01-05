import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView, Dimensions } from 'react-native';
import ModalHeader from './header';

const ModalAgendamento = () => {
    return (
            <BottomSheet
            initialSnap={1}
            snapPoints={[0, 70, Dimensions.get('screen').height - 30]}
            renderContent={() => (
                <ScrollView style={{backgroundColor: '#fff'}}>
                    <ModalHeader/>
                </ScrollView>
            )}
            />
    );
};

export default ModalAgendamento;