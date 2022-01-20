// DO YOUR MAGIC
const express = require("express");
const Cars = require("./cars-model");
const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique} = require('./cars-middleware')

const router = express.Router();

router.get("/", async (req, res, next) => {
  await Cars.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkCarId, async (req, res, next) => {
  await Cars.getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
    "/", 
    checkCarPayload, 
    checkVinNumberUnique, 
    checkVinNumberValid, 
    async (req, res, next) => {
    await Cars.create(req.body)
        .then(newCar => {
            res.json(newCar)
        })
        .catch(err => {
            next(err)
        })
});

module.exports = router;
