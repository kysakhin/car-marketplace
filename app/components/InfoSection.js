export default function InfoSection() {
  return (
    <section>
      <div className="mx-auto w-screen mt-10 pt-8 ">
        <div className="grid grid-cols-1 bg-gray-100 rounded-3xl gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div className="text-center w-[70%] mx-auto">
            <h2 className="text-4xl font-bold mb-9 text-gray-900 sm:text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>

            <p className="mt-4 text-xl text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
              architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
              sequi.
            </p>
          </div>

          <div>
            <img
              src="https://carindia.in/wp-content/uploads/2024/04/Mercedes-Benz-A200d-1-640x480.jpg"
              className="rounded w-full"
              alt="Informational section image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
