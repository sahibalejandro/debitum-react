import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Payments: React.FunctionComponent = () => {

  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPayments = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get('/payments');
      setPayments(response.data);
    } catch(err) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {payments && payments.map((payment: any) => {
        return (
          <div key={payment._id}>
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
