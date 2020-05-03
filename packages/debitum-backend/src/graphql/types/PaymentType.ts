import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'PaymentType',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    amount: { type: GraphQLInt },
    dueDate: { type: GraphQLString },
    repeatInterval: { type: GraphQLString },
    repeatDesignator: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }
});
