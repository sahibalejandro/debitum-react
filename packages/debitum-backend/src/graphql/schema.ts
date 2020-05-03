import PaymentQuery from './queries/PaymentQuery';
import PaymentsQuery from './queries/PaymentsQuery';
import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      payment: PaymentQuery,
      payments: PaymentsQuery,
    },
  }),
});
