import { View, Text,  Dimensions} from 'react-native';
import { ScrollView } from 'react-native';
import { styles } from '../../styles';

import ModalHeader from './header';
import Resume from './resume';


const ModalAgendamento = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <ModalHeader/>
        <Resume/>
      </ScrollView>
    </View>
  );
};

export default ModalAgendamento;