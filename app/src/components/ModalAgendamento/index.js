import { View, Text,  Dimensions} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles';

import ModalHeader from './header';
import Resume from './resume';
import DateTimePicker from './dateTime';
import EspecialistaPicker from './Especialistas/';
import EspecialistasModal from './Especialistas/modal';
import PaymentPicker from './payment';


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
            </ScrollView>  
            <EspecialistasModal/>
        </>
      </View>
      
    </GestureHandlerRootView>
    
  );
};

export default ModalAgendamento;