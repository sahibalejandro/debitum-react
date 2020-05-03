import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Payments</Link>
        </li>
        <li>
          <Link to='/payments/create'>Add Payment</Link>
        </li>
        <li>
          <Link to='/history'>History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
