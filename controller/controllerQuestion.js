const { get } = require("mongoose");
const Question = require("../models/question")
const Vehicle = require("../models/vehicle")

const createQuestion = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "La pregunta es requerida" });
        }

        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        const newQuestion = await Question.create({
            vehicle: vehicleId,
            user: req.user.id,
            question
        });

        res.status(201).json({ message: "Pregunta creada exitosamente", data: newQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionsByVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const questions = await Question.find({ vehicle: vehicleId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

    res.json(questions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createQuestion,
    getQuestionsByVehicle
};