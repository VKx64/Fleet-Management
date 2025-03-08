import React from "react";
import FuelUsage from "./FuelUsage";
import FuelStatistics from "./FuelStatistics";
import FuelPrediction from "./FuelPrediction";

const ModalFleetData = ({ isOpen, onClose, fleet }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex h-full w-full items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="tabs tabs-bo h-4/5 w-3/5 overflow-clip rounded-2xl bg-gray-950"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Overview"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Fuel Statistics"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="flex h-full w-full flex-row pb-10 gap-5">
            <FuelStatistics fleet={fleet} />
            <div className="flex h-full w-full flex-col justify-between gap-5">
              <FuelUsage fleet={fleet} />
              <FuelPrediction fleet={fleet} />
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Maintenance"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 3
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Location"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 4
        </div>
      </div>
    </div>
  );
};

export default ModalFleetData;
