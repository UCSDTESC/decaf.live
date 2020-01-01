import * as mongoose from 'mongoose';
import {Config} from '../config';

export default async () => {

  await mongoose.connect(Config.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}