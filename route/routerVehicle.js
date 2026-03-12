const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/controllerVehicle');

router.post('/vehicle', vehicleController.createVehicle);

router.get('/vehicle', vehicleController.getVehicles);

router.patch('/vehicle/:id', vehicleController.updateVehicle);

router.delete('/vehicle/:id', vehicleController.deleteVehicle);

module.exports = router;