import { Car, Truck, Bus, Zap, CarFront, CarTaxiFront } from "lucide-react";

export const carCategories = [
  { type: "SUV", icon: Car },
  { type: "Sedan", icon: CarFront },
  { type: "Electric", icon: Zap },
  { type: "Pickup Truck", icon: Truck },
  { type: "Minivan", icon: Bus },
  { type: "Taxi", icon: CarTaxiFront },
];

export default function Categories() {
  return (
    <div className="mt-40">
      <h2 className="md:text-5xl text-3xl m-10 font-bold">Browse by type</h2>
      <div className="flex gap-6 p-10 flex-wrap ">
        {carCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.type}
              className="flex flex-col items-center space-y-3 p-4 border w-40 cursor-pointer hover:scale-105 active:scale-95 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <Icon size={32} />
              <span className="text-lg font-medium ">{category.type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
