const Vehicle = require('../models/vehicle');

// CREATE VEHICLE
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      message: "Vehículo creado",
      data: vehicle
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VEHICLES
const getVehicles = async (req, res) => {
  try {
    const {
      brand,
      model,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      status,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (brand) filter.brand = brand;
    if (model) filter.model = model;
    if (status) filter.status = status;

    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('owner', 'name');

    const total = await Vehicle.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: vehicles
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VEHICLE BY ID
const getVehicleById = async (req, res) => {
  try {

    const vehicle = await Vehicle.findById(req.params.id)
      .populate('owner', 'name');

    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE VEHICLE
const updateVehicle = async (req, res) => {
  try {

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE VEHICLE
const deleteVehicle = async (req, res) => {
  try {

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};