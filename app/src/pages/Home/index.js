import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { FlatList, Dimensions } from 'react-native';
import theme from '../../styles/theme.json';
import { styles, Box, Button, Touchable } from '../../styles';
import util from '../../util';

import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import { getSalao, allServicos, saveAgendamento } from '../../store/modules/salao/actions';

import Header from '../../components/Header';
import Servico from '../../components/Servico';
import types from '../../store/modules/salao/types';

import ModalHeader from '../../components/ModalAgendamento/header';
import Resume from '../../components/ModalAgendamento/resume';
import DateTimePicker from '../../components/ModalAgendamento/dateTime';
import EspecialistaPicker from '../../components/ModalAgendamento/Especialistas';
import EspecialistasModal from '../../components/ModalAgendamento/Especialistas/modal';
import PaymentPicker from '../../components/ModalAgendamento/payment';
import moment from 'moment';




const Home = () => {      

    //const handleCloseAction = () => bottomSheetref.current?.close() 
    //const handleOpenPress = () => bottomSheetref.current?.expand();

    const dispatch = useDispatch();
    const { servicos, form, agendamento, agenda, colaboradores } = useSelector((state) => state.salao);

    const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD');
    const horaSelecionada = moment(agendamento.data).format('HH:mm');
    const { horariosDisponiveis, colaboradoresDia } = util.selectAgendamento(agenda, dataSelecionada, agendamento.colaboradorId)

    const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];

    const finalServicos = form.inputFiltro.length > 0 ? servicos.filter((s) => { 
        const titulo = s.titulo.toLowerCase().trim();
        const arrSearch = form.inputFiltro.toLowerCase().trim().split(' ');
        return arrSearch.every((w) => titulo.search(w) != -1);
    }) : servicos

    const bottomSheetref = useRef(null);
    const snapPoints= useMemo(() => [1, 70, Dimensions.get('window').height - 30], []);
    const setSnap = useCallback(() => {
        if (bottomSheetref.current && bottomSheetref.current.expand) {
        bottomSheetref.current?.expand();
        }
      }, [bottomSheetref]);
      
      useEffect(() => {
        dispatch(getSalao());
        dispatch(allServicos());
        if (form.modalAgendamento) {
          setSnap();
        }
      }, [dispatch,form.modalAgendamento, setSnap]);
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            
            <FlatList
                style={{
                    backgroundColor: util.toAlpha(theme.colors.muted, 5),
                }}
                ListHeaderComponent={Header}
                data={finalServicos}
                renderItem={({ item }) => <Servico servico={item} key={item} />}
                keyExtractor={(item) => item}
            />
            <BottomSheet
                ref={bottomSheetref}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{backgroundColor: '#fff'}}
                enablePanDownToClose={true}
            >
                <ScrollView stickyHeaderIndices={[0]}>
                    <ModalHeader/>
                    <Resume servico={servico}/>
                    <DateTimePicker
                        servico={servico}
                        agenda={agenda}
                        dataSelecionada ={dataSelecionada}
                        horaSelecionada={horaSelecionada}
                        horariosDisponiveis={horariosDisponiveis}
                    />
                    <EspecialistaPicker
                        colaboradores={colaboradores}
                        agendamento={agendamento}
                    />
                    <PaymentPicker/>
                    <Box hasPadding>
                        <Touchable onPress={() => dispatch(saveAgendamento())}>
                            <Button
                                loading={form.agendamentoLoading}
                                disabled={form.agendamentoLoading}
                                icon="check"
                                background="primary"
                                mode="contained"
                                block
                                uppercase={false}
                        >Confirmar agendamento</Button>
                        </Touchable>
                        
                    </Box>
                </ScrollView>  
                <EspecialistasModal
                    form={form}
                    colaboradores={colaboradores}
                    agendamento={agendamento}
                    servicos={servicos}
                    horaSelecionada={horaSelecionada}
                    colaboradoresDia={colaboradoresDia}
                />                
            </BottomSheet>
            
        </GestureHandlerRootView>   

    );
};

export default Home;