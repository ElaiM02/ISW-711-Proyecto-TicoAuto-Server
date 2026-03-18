const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../controller/controllerAuth');
const vehicleController = require('../controller/controllerVehicle');
const upload = require('../middleware/upload');


// RUTAS
router.get('/vehicle', vehicleController.getVehicles);

router.get('/vehicle/:id', authenticateToken, vehicleController.getVehicleById);

router.patch('/vehicle/:id', authenticateToken, vehicleController.updateVehicle);
router.delete('/vehicle/:id', authenticateToken, vehicleController.deleteVehicle);
router.post('/vehicle', upload.single('image'), vehicleController.createVehicle);
module.exports = router;