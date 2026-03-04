const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true },      // Marca
  model: { type: String, required: true },      // Modelo
  year: { type: Number, required: true },       // Año
  price: { type: Number, required: true },      // Precio
  status: { 
    type: String, 
    enum: ['available', 'sold'], 
    default: 'available' 
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);