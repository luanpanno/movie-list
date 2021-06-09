import mongoose from 'mongoose';

export function mongoConnect(uri: string): any {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export function mongoDisconnect(): any {
  return mongoose.disconnect();
}
