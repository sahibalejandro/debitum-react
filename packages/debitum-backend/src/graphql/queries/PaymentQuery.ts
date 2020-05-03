import { GraphQLString } from 'graphql';
import PaymentType from '../types/PaymentType';
import Payment from 'debitum-data/dist/models/Payment.js';

export default {
  type: PaymentType,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args) {
    return await Payment.findById(args.id);
  }
}
