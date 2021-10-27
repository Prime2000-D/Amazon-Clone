import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { auth } from "./firebase";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import Header from './Header';
import Home from './Home'
import Payment from "./Payment";
import Orders from "./Orders";
import Checkout from './Checkout'
import Login from './Login'
import { useStateValue } from './StateProvider';

const promise = loadStripe(
  "pk_test_51JXgUJSFrpMtJefWcK18KYaxT3737xy4LABkhMsVbETY4Nyvo5JREoOlwT4xRQJDSQKYG2IxJfWA6ysVp4pzren9001trccbnL"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only  run once  the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);
      if(authUser){
        // the user just looged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        // the useris logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe = {promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            {/* <Header /> */}
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
