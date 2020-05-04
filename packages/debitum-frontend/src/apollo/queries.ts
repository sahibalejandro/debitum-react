import { gql } from 'apollo-boost';

export const QUERY_PAYMENTS_INDEX = gql`
{
  payments {
    id
    title
    amount
    dueDate
  }
}
`;
