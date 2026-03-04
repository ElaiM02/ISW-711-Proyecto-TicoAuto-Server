const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
