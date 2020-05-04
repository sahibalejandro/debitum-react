import React from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import client from './apollo/client';
import History from './components/History';
import Payments from './components/Payments';
import CreatePayment from './components/CreatePayment';
import NavigationBar from './components/NavigationBar';

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/payments/create">
              <CreatePayment />
            </Route>
            <Route path="/payments/:id">
              <CreatePayment />
            </Route>
            <Route path="/">
              <Payments />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
