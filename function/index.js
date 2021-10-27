const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(
  "PUT_YOUR_STRIPE_SECRET_KEY"
);

// API

// App config
const app = express();

// Middleware
app.use(cors({origin : true}));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('hello world'))
app.post('/payment/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request received >>>', total);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr'
    });
    
    response.status(201).send(
        {clientSecret : paymentIntent.client_secret}
    );
})

// Listen command
exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/clone-49273/us-central1/api
