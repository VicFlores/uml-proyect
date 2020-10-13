import mongoose from 'mongoose';

require('dotenv').config({ path: 'keys.env' });

//* Connection MongoDB
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, config);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error(`Error MongoDB connect ${error}`);
  }
};

db();
