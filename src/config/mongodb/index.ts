import * as colors from 'colors'
import Log from "../../utils/Log/"
import config from '../../config';
export default {
    dbConnection(mongoose) {
        // When successfully connected
        mongoose.connection.on('connected', () => {
            console.log("Database Connected Successfully".green);
            Log.info('🟢 MongoDB connected successfully now!')

        });

        // If the connection throws an error
        mongoose.connection.on('error', (err) => {
            console.log(`Mongoose default connection error: ${err}`.red);
            console.log('=> if using local mongodb: make sure that mongo server is running \n'.red +
                '=> if using online mongodb: check your internet connection \n'.red);
            Log.error(
                `[ Database =>] The connection to the database failed: ${err.message}. = ${config.dbURI} ❌`
            )
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected'.red);
            Log.error('🔴 Mongoose default connection is disconnected!')

        });
    }
}