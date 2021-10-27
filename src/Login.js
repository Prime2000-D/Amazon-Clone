import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {auth} from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import './Login.css';

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            if(user){
              history.push('/')
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
    }
    const register = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(user)
            if (user) {
              history.push("/");
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage, errorCode)
          });
    }

    return (
      <div className="login">
        <Link to="/">
            <img className="login__logo" src="https://pngimg.com/uploads/amazon/amazon_PNG24.png" alt="" />
        </Link>
        <div className="login__container">
            <h1>Sign In</h1>
            <form action="">
                <h5>E-mail</h5>
                <input type="text" value={email} onChange=
                {e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange=
                {e => setPassword(e.target.value)}/>
                <button className="login__signInButton" onClick={signIn}>Sign In</button>
                <p>
                    By siging-in you agree to the Amazon Clone condition of Use 
                    & Sale. Please see our Privacy Notice, our cookies Notice and 
                    our Interest-Based Ads Notice.
                </p>
                <button onClick={register} className="login__registerButton">Create your Account</button>
            </form>
        </div>
      </div>
    );
}

export default Login
