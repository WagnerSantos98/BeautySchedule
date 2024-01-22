import { View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles, Box, Button } from '../../styles';

import ModalHeader from './header';
import Resume from './resume';
import DateTimePicker from './dateTime';
import EspecialistaPicker from './Especialistas/';
import EspecialistasModal from './Especialistas/modal';
import PaymentPicker from './payment';
import { useEffect} from 'react';
import { useSelector } from 'react-redux';


const ModalAgendamento = () => {
   
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <>
            <ScrollView stickyHeaderIndices={[0]}>
              <ModalHeader/>
              <Resume/>
              <DateTimePicker/>
              <EspecialistaPicker/>
              <PaymentPicker/>
              <Box hasPadding>
                <Button
                  icon="check"
                  background="primary"
                  mode="contained"
                  block
                  uppercase={false}
                >Confirmar agendamento</Button>
              </Box>
            </ScrollView>  
            <EspecialistasModal/>
        </>
      </View>
      
    </GestureHandlerRootView>
    
  );
};

export default ModalAgendamento;