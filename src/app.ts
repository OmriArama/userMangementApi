import * as express from 'express';
import { Config } from './config';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { userRouter } from './Routes/usersRoute';


const setMongoDBConnection = async () => {
    try {
       const client = await mongoose.connect(Config.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })    
       console.log('success connecting to db');
    }
    catch{
        console.log('failed to connect to db');
    }
}

export const App = (): express.Express => {
    setMongoDBConnection();
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/users', userRouter);
    return app;
}
