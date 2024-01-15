import { View, Text,  Dimensions} from 'react-native';
import { ScrollView } from 'react-native';
import { styles } from '../../styles';

import ModalHeader from './header';
import Resume from './resume';
import DateTime from './dateTime';


const ModalAgendamento = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <ModalHeader/>
        <Resume/>
        <DateTime/>
      </ScrollView>
    </View>
  );
};

export default ModalAgendamento;