import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Box, Text, Title, Touchable } from '../../styles';
import theme from '../../styles/theme.json';
import util from '../../util';
import { select } from 'redux-saga/effects';

const dateTime = () => {
    return (
        <>
            <Text bold color="dark" hasPadding>Para quando você gostaria de agendar?</Text>
            <GestureHandlerRootView>
            <FlatList
                data={['a', 'b', 'c', 'd', 'e', 'f']}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                contentContainerStyle={{
                    paddingLeft: 20,      
                }}
                renderItem={({ item }) => (
                    <Touchable 
                        key={item}
                        width="70px"
                        height="80px"
                        spacing="0 10px 0 0"
                        rounded="10px"
                        direction="column"
                        justify="center"
                        align="center"
                        border={`1px solid ${item === 'a' ? theme.colors.primary : util.toAlpha(theme.colors.muted, 50)}`}
                        background={item === 'a' ? 'primary' : 'light'}
                    >
                        <Text small color={item === 'a' ? 'light' : undefined}>Dom</Text>
                        <Title small color={item === 'a' ? 'light' : undefined}>14</Title>
                        <Text small color={item === 'a' ? 'light' : undefined}>Janeiro</Text>
                    </Touchable>
                )}
            />
            <Text bold color="dark" hasPadding>Que horas?</Text>
            <FlatList
                data={[
                    ['14:30', '15:00'],
                    ['15:30', '16:00'],
                    ['16:30', '17:00'],
                    ['17:30'],
                ]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 20
                }}
                renderItem={({ item }) => (
                    <Box direction="column" spacing="0 10px 0 0">
                    {item.map(horario => (
                        <Touchable
                            key={horario}
                            width="100px"
                            height="35px"
                            spacing="0 0 5px 0"
                            rounded="7px"
                            justify="center"
                            align="center"
                            border={`1px solid ${horario === '14:30' ? theme.colors.primary : util.toAlpha(theme.colors.muted, 50)}`}
                            background={horario === '14:30' ? 'primary' : 'light'}
                        >
                            <Text color={horario === '14:30' ? 'light' : undefined}>{horario}</Text>
                        </Touchable>
                    ))}
                    </Box>
    )}
            />
            </GestureHandlerRootView>
        </>
    );
};

export default dateTime;