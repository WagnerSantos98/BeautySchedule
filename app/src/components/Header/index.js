import React from 'react';
import { Text } from 'react-native-paper';
import { Cover, GradientView } from '../../styles';

const Header = () => {
    return(
        <Cover 
            image="https://images.adsttc.com/media/images/6013/8f05/f91c/8125/1500/02d2/large_jpg/Roby_Salao_Beleza-3774.jpg?1611894525"
            width="100%"
            height="300px">
            <GradientView colors={['#21232F33', '#21232FE6']}></GradientView>
            </Cover>
    );

    
};

export default Header;