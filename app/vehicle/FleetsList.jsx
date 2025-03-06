"use client";
import React from "react";
import useFleets from "@/hooks/useFleets";
import { Icon } from "@iconify/react";

const FleetsList = ({ driver }) => {
  const { fleets, loading, error } = useFleets(driver);

  return (
    <div className="h-full w-full bg-blue-500 p-4">
      <ul className="list gap-2">
        {/* List header with new fleet button */}
        <div className="flex items-center justify-between bg-orange-400">
          <h1 className="text-start text-3xl font-bold">Fleets</h1>
          <button className="btn whitespace-nowrap">
            <Icon icon="akar-icons:plus" />
            New Fleet
          </button>
        </div>

        {/* Loading fleets */}
        {loading && (
          <div className="flex w-full flex-col items-center justify-center">
            <span className="loading loading-infinity loading-xl"></span>
            <p className="text-xs">Loading Fleets list</p>
          </div>
        )}

        {/* Error fetching fleets */}
        {error && (
          <div role="alert" className="alert alert-info alert-dash">
            <span>{error}</span>
          </div>
        )}

        {/* Fleets list */}
        <li className="list-row list-col-grow bg-red-100 p-0">
          {fleets.length === 0 ? (
            <p>No Fleets available</p>
          ) : (
            fleets.map((fleet) => <Fleet key={fleet.id} fleet={fleet} />)
          )}
        </li>
      </ul>
    </div>
  );
};

const Fleet = ({ fleet }) => {
  const { plate, id, image } = fleet;
  const imageUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/fleets/${id}/${image}`;

  return (
    <div className="flex h-fit w-fit flex-col gap-2 overflow-clip rounded-xl bg-red-500">
      <img className="aspect-square size-48" src={imageUrl} alt="Fleet" />
      <h1 className="text-center text-2xl">{plate}</h1>
      <button className="btn btn-soft">View Fleet</button>
    </div>
  );
};

export default FleetsList;
