// STRETCH
exports.seed = function (knex) {
    return knex("cars")
      .truncate()
      .then(function () {
        // Inserts seed entries
        return knex("cars").insert([
          {vin: "123", make: "Tesla", model: "Roadster", mileage: "0"},
        ]);
      });
  };