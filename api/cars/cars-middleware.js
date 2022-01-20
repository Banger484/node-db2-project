const C = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await C.getById(req.params.id);
    if (!car) {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({
      message: `vin is missing`,
    });
    next();
  }
  if (!req.body.make) {
    res.status(400).json({
      message: `make is missing`,
    });
    next();
  }
  if (!req.body.model) {
    res.status(400).json({
      message: `model is missing`,
    });
    next();
  }
  if (!req.body.mileage) {
    res.status(400).json({
      message: `mileage is missing`,
    });
    next();
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({
        message: `vin ${req.body.vin} is invalid`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existingVin = await C.getByVin(req.body.vin);
    if (existingVin) {
      res.status(400).json({
        message: `vin ${req.body.vin} already exists`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
