const Car = require("./models/car.model");
const User = require("./models/user.model");

const create = async () => {
  const user1 = await new User({
    name: "John Doe",
    email: "john@gmail.com",
    password: "123456",
    isAdmin: false,
    paymentMethod: "stripe",
  });

  const user2 = await new User({
    name: "JaneDoe",
    email: "jane@gmail.com",
    password: "123456",
    isAdmin: false,
    paymentMethod: "paypal",
  });

  const user3 = await new User({
    name: "AdminDoe",
    email: "admin@gmail.com",
    password: "123456",
    isAdmin: true,
    paymentMethod: "stripe",
  });

  const user4 = await new User({
    name: "AdminDoe",
    email: "admin2@gmail.com",
    password: "123456",
    isAdmin: true,
    paymentMethod: "paypal",
  });

  const user5 = await new User({
    name: "AdminDoeThree",
    email: "aadminThree@gmail.com",
    password: "123456",
    isAdmin: true,
    paymentMethod: "stripe",
  });

  const user6 = await new User({
    name: "AdminDoeFourth",
    email: "adminFourth@gmail.com",
    password: "123456",
    isAdmin: true,
    paymentMethod: "paypal",
  });

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
  await user6.save();
};

const createCars = async () => {
  const car1 = await new Car({
    name: "Audi A3",
    price: 100,
    immatriculation: "AA-000-AA",
    categories: "Berline",
    isRental: false,
  });

  const car2 = await new Car({
    name: "Audi A4",
    price: 200,
    immatriculation: "AA-001-AA",
    categories: "Berline",
    isRental: false,
  });

  const car3 = await new Car({
    name: "Audi A5",
    price: 300,
    immatriculation: "AA-002-AA",
    categories: "Berline",
    isRental: false,
  });

  const car4 = await new Car({
    name: "Audi A6",
    price: 400,
    immatriculation: "AA-003-AA",
    categories: "Berline",
    isRental: false,
  });

  const car5 = await new Car({
    name: "Audi A7",
    price: 500,
    immatriculation: "AA-004-AA",
    categories: "Berline",
    isRental: false,
  });

  const car6 = await new Car({
    name: "Audi A8",
    price: 600,
    immatriculation: "AA-005-AA",
    categories: "Berline",
    isRental: false,
  });

  const car7 = await new Car({
    name: "Audi Q3",
    price: 700,
    immatriculation: "AA-006-AA",
    categories: "SUV",
    isRental: false,
  });

  const car8 = await new Car({
    name: "Audi Q5",
    price: 800,
    immatriculation: "AA-007-AA",
    categories: "SUV",
    isRental: false,
  });

  const car9 = await new Car({
    name: "Audi Q7",
    price: 900,
    immatriculation: "AA-008-AA",
    categories: "SUV",
    isRental: false,
  });

  const car10 = await new Car({
    name: "Audi Q8",
    price: 1000,
    immatriculation: "AA-009-AA",
    categories: "SUV",
    isRental: false,
  });

  const car11 = await new Car({
    name: "Audi TT",
    price: 1100,
    immatriculation: "AA-010-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car12 = await new Car({
    name: "Audi R8",
    price: 1200,
    immatriculation: "AA-011-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car13 = await new Car({
    name: "Audi RS3",
    price: 1300,
    immatriculation: "AA-012-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car14 = await new Car({
    name: "Audi RS4",
    price: 1400,
    immatriculation: "AA-013-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car15 = await new Car({
    name: "Audi RS5",
    price: 1500,
    immatriculation: "AA-014-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car16 = await new Car({
    name: "Audi RS6",
    price: 1600,
    immatriculation: "AA-015-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car17 = await new Car({
    name: "Audi RS7",
    price: 1700,
    immatriculation: "AA-016-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car18 = await new Car({
    name: "Audi RS8",
    price: 1800,
    immatriculation: "AA-017-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car19 = await new Car({
    name: "Audi RSQ3",
    price: 1900,
    immatriculation: "AA-018-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car20 = await new Car({
    name: "Audi RSQ5",
    price: 2000,
    immatriculation: "AA-019-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car21 = await new Car({
    name: "Audi RSQ7",
    price: 2100,
    immatriculation: "AA-020-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car22 = await new Car({
    name: "Audi RSQ8",
    price: 2200,
    immatriculation: "AA-021-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car23 = await new Car({
    name: "Audi RS3",
    price: 2300,
    immatriculation: "AA-022-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car24 = await new Car({
    name: "Audi RS4",
    price: 2400,
    immatriculation: "AA-023-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car25 = await new Car({
    name: "Audi RS5",
    price: 2500,
    immatriculation: "AA-024-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car26 = await new Car({
    name: "Audi RS6",
    price: 2600,
    immatriculation: "AA-025-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car27 = await new Car({
    name: "Audi RS7",
    price: 2700,
    immatriculation: "AA-026-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car28 = await new Car({
    name: "Audi RS8",
    price: 2800,
    immatriculation: "AA-027-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car29 = await new Car({
    name: "Audi RSQ3",
    price: 2900,
    immatriculation: "AA-028-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car30 = await new Car({
    name: "Audi RSQ5",
    price: 3000,
    immatriculation: "AA-029-AA",
    categories: "Sportive",
    isRental: false,
  });

  const car31 = await new Car({
    name: "peugeot 208",
    price: 100,
    immatriculation: "AA-030-AA",
    categories: "Citadine",
    isRental: false,
  });

  const car32 = await new Car({
    name: "peugeot 308",
    price: 200,
    immatriculation: "AA-031-AA",
    categories: "Citadine",
    isRental: false,
  });

  const car33 = await new Car({
    name: "peugeot 408",
    price: 300,
    immatriculation: "AA-032-AA",
    categories: "Citadine",
    isRental: false,
  });

  const car34 = await new Car({
    name: "peugeot 508",
    price: 400,
    immatriculation: "AA-033-AA",
    categories: "Citadine",
    isRental: false,
  });

  const car35 = await new Car({
    name: "porsche 911",
    price: 500,
    immatriculation: "AA-034-AA",
    categories: "Sportive",
    isRental: false,
  });

  await car1.save();
  await car2.save();
  await car3.save();
  await car4.save();
  await car5.save();
  await car6.save();
  await car7.save();
  await car8.save();
  await car9.save();
  await car10.save();
  await car11.save();
  await car12.save();
  await car13.save();
  await car14.save();
  await car15.save();
  await car16.save();
  await car17.save();
  await car18.save();
  await car19.save();
  await car20.save();
  await car21.save();
  await car22.save();
  await car23.save();
  await car24.save();
  await car25.save();
  await car26.save();
  await car27.save();
  await car28.save();
  await car29.save();
  await car30.save();
  await car31.save();
  await car32.save();
  await car33.save();
  await car34.save();
  await car35.save();
};

const importData = async () => {
  const users = await User.find();
  const cars = await Car.find();

  if (cars.length > 0 || users.length > 0) {
    console.log("Data already exists");
  } else {
    console.log("Data imported");
    await create();
    await createCars();
  }
};

module.exports = importData;
