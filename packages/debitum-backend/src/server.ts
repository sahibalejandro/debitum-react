import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';

import 'debitum-data/dist/connect.js';
import RootSchema from './graphql/schema' ;
import Payment from 'debitum-data/dist/models/Payment.js';

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: RootSchema,
  graphiql: true,
}));

app.post('/payments', async (req, res) => {
  const payment = new Payment(req.body.payment);
  payment.createdAt = new Date();
  payment.updatedAt = new Date();

  try {
    await payment.save();
    res.json({ payment: { _id: payment._id }, message: 'Payment created' });
  } catch(err) {
    res.status(500).send(err.message);
  }
});

app.get('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).lean(true);
    res.send(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Can't read payment with id: ${req.params.id}`);
  }
});

app.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch(err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001'));
