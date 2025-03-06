"use client";
import React, { useEffect, useState } from "react";
import DriversList from './DriversList'
import FleetsList from './FleetsList'

const page = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Function to handle driver selection
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className='w-full h-full flex flex-row'>
      <DriversList onSelectDriver={handleDriverSelect}/>

      {/* Conditionally check for driver selection */}
      {selectedDriver ? (
        <FleetsList driver={selectedDriver}/>
      ) : (
        <p className='w-full h-full bg-blue-500 flex items-center justify-center'>Select a driver first</p>
      )}
    </div>
  )
}

export default page