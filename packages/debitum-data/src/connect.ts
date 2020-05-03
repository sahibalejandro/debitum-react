import * as mongoose from 'mongoose';

const uri = 'mongodb://debitum:debitum123@ds155424.mlab.com:55424/debitum';

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to ${uri}`);
  } catch(err) {
    console.error(`Could not connect to ${uri}: ${err}`);
  }
};

connect();
