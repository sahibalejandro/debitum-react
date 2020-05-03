import { GraphQLList } from 'graphql';
import PaymentType from '../types/PaymentType';
import Payment from 'debitum-data/dist/models/Payment.js';

export default {
  type: new GraphQLList(PaymentType),
  args: {},
  async resolve(parent, args) {
    return await Payment.find();
  }
}
