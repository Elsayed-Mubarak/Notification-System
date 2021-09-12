import mongoose from 'mongoose'
import Config from '../config'
mongoose.Promise = global.Promise;

mongoose.connect(Config.dbURI, function (err) {
    if (err) return console.error(err);
    console.log('**************************************************************');
    console.log('connection successed to mongoDB>>> notification-system');
    console.log('**************************************************************');
})

export default mongoose