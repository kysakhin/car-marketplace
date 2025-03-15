import { faker } from "@faker-js/faker";

function createRandomCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10cftxEDYqZ_iLLpBES4SqCJGPeCl2d3-uA&s',
    miles: '4500',
    transmission: 'Automatic',
    price: faker.finance.amount({min: 4000, max: 15000})
  };
}

export const carList = faker.helpers.multiple(createRandomCarList, {
  count: 6
})
