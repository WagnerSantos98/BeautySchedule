const mongoose = require('mongoose');
const URI = 'mongodb+srv://wagnersjesus98:ogEfWgyyxIMx9mWL@clusterdev.r20aild.mongodb.net/beauty-schedule?retryWrites=true&w=majority';


mongoose.connect(URI)
        .then(() => console.log('DB is Up!'))
        .catch(() => console.log(err));
