const mongoosse = require('mongoose');
const URI = '';

mongoosse.set('userNewUrlParser', true);
mongoosse.set('useFindAndModify', true);
mongoosse.set('useCreateIndex', true);
mongoosse.set('useUnifiedTopology', true);

mongoose.connect(URI)
        .then(() => console.log('DB is Up!'))
        .catch(() => console.log(err));
