import React from "react";
import NavigationBar from './components/NavigationBar';
import Payments from './components/Payments';
import CreatePayment from './components/CreatePayment';
import History from './components/History';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

const App: React.FunctionComponent = () => {
  return (
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
  );
};

export default App;
