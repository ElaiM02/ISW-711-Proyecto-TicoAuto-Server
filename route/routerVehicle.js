const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/controllerVehicle');

// CREAR VEHICULO
router.post('/', vehicleController.createVehicle);

// OBTENER VEHICULOS
router.get('/', vehicleController.getVehicles);

// ACTUALIZAR
router.put('/:id', vehicleController.updateVehicle);

// ELIMINAR
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;