import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PAYMENTS_INDEX } from '../apollo/queries';

const Payments: React.FunctionComponent = () => {

  const { loading, error, data } = useQuery(QUERY_PAYMENTS_INDEX);

  return (
    <div>
      <h1>Payments</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && data.payments.map((payment: any) => {
        return (
          <div key={payment.id}>
            <h3>{payment.title}</h3>
            <div>{payment.amount}</div>
            <Link to={`/payments/${payment._id}`}>Edit</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Payments;
