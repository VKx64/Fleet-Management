import React from "react";

const Fleets = ({ fleet }) => {
  const { plate, id, image } = fleet;
  const imageUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/fleets/${id}/${image}`;

  return (
    <div className="flex h-fit w-48 flex-col gap-2 overflow-y-scroll rounded-2xl bg-red-100 p-2">
      <div className="aspect-square w-full">
        <img
          src={imageUrl}
          alt="Driver"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      <h1 className="w-full bg-blue-500 text-center text-xl font-bold">
        {plate}
      </h1>

      <button className="h-fit w-full rounded-lg bg-orange-400 px-4 py-2 text-base hover:bg-orange-300">
        View Fleet
      </button>
    </div>
  );
};

export default Fleets;
