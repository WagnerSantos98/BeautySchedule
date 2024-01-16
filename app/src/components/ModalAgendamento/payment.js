import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Image } from 'react-native';
import theme from '../../styles/theme.json';
import util from '../../util';

import { Box, Text, Touchable } from '../../styles';


const PaymentPicker = () => {
    return(
        <>
            <Text bold hasPadding color="dark">Como você gostaria de pagar?</Text>
            <View style={{ paddingHorizontal: 20}}>
                <Touchable 
                    height="40px"
                    rounded="5px"
                    background={util.toAlpha(theme.colors.muted, 5)}
                    border={`0.5px solid ${util.toAlpha(theme.colors.muted, 40)}`}
                    align="center"  
                    justify="space-between"
                >
                    <Box>
                        <Image 
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png'}}
                            style={{
                                top: 3,
                                width: 30.2,
                                height: 10,
                                marginLeft: 10,
                                marginRight: '15%',
                            }}
                        />
                        <Text small bold>4152 **** **** **** **** 0981</Text>
                    </Box>
                    <Icon name="cog-outline" color={theme.colors.muted} size={20} style={{marginRight: 10}}/>
                </Touchable>
            </View>
        </>
    );
};

export default PaymentPicker;