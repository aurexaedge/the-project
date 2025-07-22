import mongoose from 'mongoose';

const dbConnectionString =
  process.env.NODE_ENV === 'production'
    ? `${process.env.MONGODB_URI}`
    : `mongodb://localhost:27017/aurexaedge_db`;

async function connect() {
  mongoose.set('strictQuery', false);

  try {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
      console.log('Already connected');
      return;
    }

    if (connectionState === 2) {
      console.log('Connecting...');
      return;
    }

    await mongoose.connect(dbConnectionString).then(() => {
      console.log('connection successful');
    });
  } catch (error) {
    console.log('something went wrong with db');
  }
}

const db = { connect };

export default db;
