const Answer = require('../models/answer');
const Question = require('../models/question');
const Vehicle = require('../models/vehicle');

const createAnswer = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { answer: answerText } = req.body;

        if (!answerText) {
            return res.status(400).json({ message: "La respuesta es requerida" });
        }

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }

        const vehicle = await Vehicle.findById(question.vehicle);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        if (vehicle.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para responder esta pregunta" });
        }

    const existingAnswer = await Answer.findOne({ question: questionId });

    if (existingAnswer) {
        return res.status(400).json({ message: "Esta pregunta ya ha sido respondida" });
    }

        const newAnswer = await Answer.create({
            question: questionId,
            user: req.user.id,
            answer: answerText
        });

        res.status(201).json({ message: "Respuesta creada exitosamente", data: newAnswer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAnswer
};