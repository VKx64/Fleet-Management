"use client";
import React, { useEffect, useState } from "react";
import { pb, getCurrentUser } from "../../lib/pocketbase";
import Drivers from "@/components/Drivers";
import Fleets from "@/components/Fleets";

const page = () => {
  const [drivers, setDrivers] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

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
              <Drivers
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
            fleets.map((fleet) => <Fleets key={fleet.id} fleet={fleet} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
