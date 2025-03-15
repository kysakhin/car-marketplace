import { carList } from "../shared/Fake_Data";
import { Gauge, Fuel, Joystick } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function MostSearched() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center ">
      <h2 className="lg:text-4xl text-2xl text-center font-bold">Most Searched Cars</h2>
      
      <Carousel className="w-full max-w-5xl">
        <CarouselContent className="-ml-4 md:-ml-6">
          {carList.map((car, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:pl-6 basis-1/2 md:basis-1/3"
            >
              <div className="shadow-sm hover:shadow-lg transition-all rounded-md flex flex-col w-full">
                <img src={car.image} className="w-full" alt={car.name} />
                <div className="p-5 pb-0">
                  <h1 className="text-start p-4 text-2xl font-semibold">{car.name}</h1>
                  <Separator />

                  <div className="p-4 flex gap-7 mt-5 w-fit mx-auto">
                    <div className="flex flex-col gap-4 items-center">
                      <Gauge />
                      <p>{car.miles}</p>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                      <Fuel />
                      <p>{car.fuelType}</p>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                      <Joystick />
                      <p>{car.transmission}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex m-6 justify-between">
                    <h3 className="text-xl font-bold">${car.price}</h3>
                    <Link className="text-blue-500 underline cursor-pointer" href="/">
                      See details
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
