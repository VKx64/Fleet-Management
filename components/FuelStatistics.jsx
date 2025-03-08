import React from "react";
import useFuelEntries from "@/hooks/useFuelEntries";

const FuelStatistics = ({ fleet }) => {
  const { fuelEntries, loading, error } = useFuelEntries(fleet.id);

  // Calculate statistics
  const totalAmountSpent = fuelEntries.reduce((total, entry) => total + (entry.fuel_quantity * entry.cost_per_unit), 0);
  const totalTimesRefueled = fuelEntries.length;
  const totalGasRefueled = fuelEntries.reduce((total, entry) => total + entry.fuel_quantity, 0);
  const lastGasDate = fuelEntries.length > 0 ? new Date(Math.max(...fuelEntries.map(entry => new Date(entry.entry_date)))).toLocaleDateString() : "N/A";

  // Predict next month's gas consumption and spendings
  const averageFuelQuantity = totalGasRefueled / totalTimesRefueled || 0;
  const averageCostPerUnit = totalAmountSpent / totalGasRefueled || 0;
  const predictedGasConsumption = averageFuelQuantity * 30; // Assuming daily refueling
  const predictedSpendings = predictedGasConsumption * averageCostPerUnit;

  // Additional statistics
  const averageCostPerRefuel = totalAmountSpent / totalTimesRefueled || 0;
  const averageQuantityPerRefuel = totalGasRefueled / totalTimesRefueled || 0;
  const totalCostPerLiter = totalAmountSpent / totalGasRefueled || 0;

  return (
    <div className="flex flex-col w-fit h-full gap-5 items-start rounded-box border-base-content/5 bg-base-100 border p-8">
      <div className="stats">
        <div className="stat-title">Total Amount Spent on Gas</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : `₱${totalAmountSpent.toFixed(2)}`}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>

      <div className="stats">
        <div className="stat-title">Total Times Refueled</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : totalTimesRefueled}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>

      <div className="stats">
        <div className="stat-title">Total Gas Refueled</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : `${totalGasRefueled} liters`}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>

      <div className="stats">
        <div className="stat-title">Last Gas Date</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : lastGasDate}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>

      <div className="stats">
        <div className="stat-title">Average Cost per Refuel</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : `₱${averageCostPerRefuel.toFixed(2)}`}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>

      <div className="stats">
        <div className="stat-title">Average Quantity per Refuel</div>
        <div className="stat-value text-3xl overflow-clip">{loading ? "Loading..." : `${averageQuantityPerRefuel.toFixed(2)} liters`}</div>
        <div className="stat-desc">{error && <span className="text-red-500">{error}</span>}</div>
      </div>
    </div>
  );
};

export default FuelStatistics;
