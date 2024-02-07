export default {
    diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    selectAgendamento: (agenda, data = null, colaboradorId = null) => {
        let horariosDisponiveis = [];
        let colaboradoresDia = [];

        if(agenda.length > 0) {
            data = data || Object.keys(agenda?.[0])?.[0];
            const dia = agenda.filter((a) => Object.keys(a)[0] === data)?.[0];
            const diaObject = dia?.[data];
            if(diaObject) {
               colaboradorId = colaboradorId || Object.keys(diaObject)?.[0];
               colaboradoresDia = diaObject;
               horariosDisponiveis = colaboradoresDia?.[colaboradorId];
            }
        }
        return {horariosDisponiveis, data, colaboradoresDia, colaboradorId};
    },
};