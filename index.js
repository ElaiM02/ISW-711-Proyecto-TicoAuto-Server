require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const { generateToken } = require('./controller/controllerAuth');

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

//AUTH ROUTE
app.post('/auth/token', generateToken);

//route
app.use('/api', authenticateToken, require('./route/routerUser'));
app.use('/api', require('./route/routerVehicle'));

//VEHICLE ROUTES  ← ESTA ES LA QUE FALTABA
app.use('/api/vehicles', require('./route/routerVehicle'));


//START SERVER
app.listen(3008, () => {
    console.log('UTN API service listening on port 3008!');
});