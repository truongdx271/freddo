import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { getTables } from './actions/tableActions';
import { getFalseOrders, getQueueOrders } from './actions/orderActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/not-found/NotFound';
import Menu from './components/menu/Menu';
import CreateItem from './components/menu-item/CreateItem';
import EditItem from './components/menu-item/EditItem';
import Home from './components/home/Home';
import Group from './components/group/Group';
import CreateGroup from './components/group/CreateGroup';
import EditGroup from './components/group/EditGroup';
import Table from './components/table/Table';
import CreateTable from './components/table/CreateTable';
import EditTable from './components/table/EditTable';
import User from './components/users/User';

import './App.css';
import {
  iotest,
  invoiceUpdate,
  invoiceRequest,
  updateTable,
  onLeaveQueue,
  onInvoiceComplete
} from './api';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    // Test socket
    iotest(data => console.log(data));

    // Update table status after create an order
    invoiceUpdate(order => {
      console.log(order);
      store.dispatch(getTables());
      store.dispatch(getFalseOrders());
      store.dispatch(getQueueOrders());
    });

    // Update table status after request to pay
    invoiceRequest(order => {
      console.log(order);
      store.dispatch(getTables());
      // store.dispatch(getFalseOrders());
    });

    // Update table when change table action
    updateTable(table => {
      console.log(table);
      store.dispatch(getTables());
    });

    // update table when leaveQueue
    onLeaveQueue(order => {
      console.log(order);
      store.dispatch(getTables());
    });

    //Update table when complete
    onInvoiceComplete(table => {
      console.log(table);
      store.dispatch(getTables());
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/menu" component={Menu} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-item"
                    component={CreateItem}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-item" component={EditItem} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/home" component={Home} />
                </Switch>
                <Switch>
                  <AdminRoute exact path="/group" component={Group} />
                </Switch>
                <Switch>
                  <AdminRoute
                    exact
                    path="/create-group"
                    component={CreateGroup}
                  />
                </Switch>
                <Switch>
                  <AdminRoute exact path="/edit-group" component={EditGroup} />
                </Switch>
                <Switch>
                  <AdminRoute exact path="/table" component={Table} />
                </Switch>
                <Switch>
                  <AdminRoute
                    exact
                    path="/create-table"
                    component={CreateTable}
                  />
                </Switch>
                <Switch>
                  <AdminRoute exact path="/users" component={User} />
                </Switch>
                <Switch>
                  <AdminRoute exact path="/edit-table" component={EditTable} />
                </Switch>
              </div>
              <Route exact path="/not-found" component={NotFound} />
              <Route exact path="/" component={Footer} />
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
