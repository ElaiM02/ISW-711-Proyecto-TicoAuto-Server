require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const { generateToken, authenticateToken } = require('./controller/controllerAuth');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

//Database status
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: '*'
}));

 app.use('/upload', express.static('upload'));
  

//AUTH ROUTE
app.post('/auth/token', generateToken);

//route
app.use('/api', require('./route/routerUser'));
app.use('/api', require('./route/routerVehicle'));

//VEHICLE ROUTES  
app.use('/api/vehicles', require('./route/routerVehicle'));


//START SERVER
app.listen(3008, () => {
    console.log('UTN API service listening on port 3008!');



  
});