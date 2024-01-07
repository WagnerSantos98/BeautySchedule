const moment = require('moment');
const { merge } = require('./routes/agendamento.routes');

module.exports = {
    SLOT_DURATION: 30,
    hourToMinutes: (hourMinute) => {
        //1:20
        const [hour, minutes] = hourMinute.split(':');
        return parseInt(parseInt(hour) * 60 + parseInt(minutes));
    },
    sliceMinutes: (start, end, duration) => {
        const slices = [];// [1:30, 2:00. 3:00]
        let count = 0;

        //90 == 1:30
        start = moment(start);
        //180 == 3:00
        end = moment(end); 
        
        while(end > start){
            slices.push(start.format('HH:mm'));
            start = start.add(duration, 'minutes');
            count ++;
        }

        return slices;
    },
    mergeDateTime: (date, time) => {
        const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm')}`;

        return merged;
    },
    splitByValue: (array, value) => {
        let newArray = [[]];
        array.forEach((item) => {
            if(item != value){
                newArray[newArray.length - 1] .push(item);
            }else{
                newArray.push([]);
            }
        });
        return newArray;
    }
}