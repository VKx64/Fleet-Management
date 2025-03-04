"use client";
import React, { useEffect, useState } from "react";
import { pb, getCurrentUser } from "../../lib/pocketbase";

const page = () => {
  const [drivers, setDrivers] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null); // State to track selected driver

  // Fetch drivers on page load
  useEffect(() => {
    const fetchDrivers = async () => {
      const loggedinUser = getCurrentUser();

      try {
        const result = await pb.collection("drivers").getList(1, 100, {
          filter: `admin.id = "${loggedinUser.id}"`,
        });

        setDrivers(result.items);
      } catch (error) {
        setError("Error fetching drivers.");
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Fetch fleets when selected driver changes
  useEffect(() => {
    if (selectedDriver) {
      const fetchFleets = async () => {
        try {
          const result = await pb.collection("fleets").getList(1, 100, {
            filter: `driver.id = "${selectedDriver.id}"`,
          });
          setFleets(result.items);
        } catch (error) {
          setError("Error fetching fleets.");
          console.error("Error fetching fleets:", error);
        }
      };

      fetchFleets();
    }
  }, [selectedDriver]);

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-row">
      {/* Left Side */}
      <div className="flex h-full w-1/3 flex-col gap-5 bg-red-300 p-5">
        <h1 className="w-full text-2xl font-bold">Driver List</h1>
        <div className="scroll flex h-full w-full flex-col gap-2 overflow-y-scroll pr-2">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : drivers.length === 0 ? (
            <div>No drivers assigned yet.</div>
          ) : (
            drivers.map((driver) => (
              <DriverList
                key={driver.id}
                driver={driver}
                isSelected={selectedDriver?.id === driver.id}
                onSelect={handleDriverSelect}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex h-full w-full flex-col gap-5 bg-blue-300 p-5">
        <h1 className="w-full text-2xl font-bold">Vehicle List</h1>
        <div className="flex flex-wrap gap-4">
          {selectedDriver && fleets.length === 0 ? (
            <div>No fleets assigned to this driver.</div>
          ) : (
            fleets.map((fleet) => (
              <DriverFleets key={fleet.id} fleet={fleet} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const DriverList = ({ driver, isSelected, onSelect }) => {
  const { id, name, avatar, phone, email } = driver;
  const avatarUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/drivers/${id}/${avatar}`;

  return (
    <div
      className={`flex h-20 w-full cursor-pointer flex-row items-start justify-start gap-2 rounded-2xl py-2 pr-4 pl-2 ${
        isSelected ? "bg-amber-400" : "bg-amber-200"
      }`}
      onClick={() => onSelect(driver)}
    >
      <div className="aspect-square h-full">
        <img
          src={avatarUrl}
          alt="Driver"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl whitespace-nowrap text-black">{name}</h1>
        <p className="text-xs text-gray-600">{email}</p>
        <p className="text-xs text-gray-600">+63 {phone}</p>
      </div>
    </div>
  );
};

const DriverFleets = ({ fleet }) => {
  const { plate, id, image } = fleet;
  const imageUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/fleets/${id}/${image}`;

  return (
    <div className="flex h-fit w-48 flex-col gap-2 bg-red-100 p-2 rounded-2xl overflow-y-scroll">
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

export default page;
