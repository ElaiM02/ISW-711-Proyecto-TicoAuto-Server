const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controller/controllerAuth');
const vehicleController = require('../controller/controllerVehicle');


router.get('/vehicle', vehicleController.getVehicles);

router.get('/vehicle/:id',authenticateToken, vehicleController.getVehicleById);
router.post('/vehicle', authenticateToken, vehicleController.createVehicle);
router.patch('/vehicle/:id', authenticateToken, vehicleController.updateVehicle);
router.delete('/vehicle/:id', authenticateToken, vehicleController.deleteVehicle);

module.exports = router;