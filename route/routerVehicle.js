const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../controller/controllerAuth');
const vehicleController = require('../controller/controllerVehicle');
const controllerQuestion = require('../controller/controllerQuestion');
const controllerAnswer = require('../controller/controllerAnswer');

const upload = require('../middleware/upload');

const controllerAnswer = require('../controller/controllerAnswer');
const controllerQuestion = require('../controller/controllerQuestion');

// RUTAS
router.get('/vehicle', vehicleController.getVehicles);

router.get('/vehicle/:id', authenticateToken, vehicleController.getVehicleById);
router.patch('/vehicle/:id', authenticateToken, vehicleController.updateVehicle);
router.delete('/vehicle/:id', authenticateToken, vehicleController.deleteVehicle);

router.post('/vehicle', upload.single('image'), vehicleController.createVehicle);

router.post('/question/:vehicleId', authenticateToken, controllerQuestion.createQuestion);
router.get('/question/:vehicleId', controllerQuestion.getQuestionsByVehicle);
router.post('/answer/:questionId', authenticateToken, controllerAnswer.createAnswer);

module.exports = router;