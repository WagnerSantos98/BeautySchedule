import { View, Text,  Dimensions} from 'react-native';
import ModalHeader from './header';
import { ScrollView } from 'react-native';
import { styles } from '../../styles';


const ModalAgendamento = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <ModalHeader/>
      </ScrollView>
    </View>
  );
};

export default ModalAgendamento;