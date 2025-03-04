"use client";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const page = () => {
  const { user, isAuthenticated } = useAuth();

  const truckData = [
    { name: "Truck A", gasLeft: 50 , maxCapacity: 100},
    { name: "Truck B", gasLeft: 75 , maxCapacity: 125},
    { name: "Truck C", gasLeft: 20 , maxCapacity: 100},
    { name: "Truck D", gasLeft: 60 , maxCapacity: 134},
    { name: "Truck E", gasLeft: 40 , maxCapacity: 180},
    { name: "Truck F", gasLeft: 90 , maxCapacity: 100},
  ];

  const getColorByGasLevel = (gasLeft) => {
    if (gasLeft <= 30) {
      return "#FF6347"; // Red for low fuel
    } else if (gasLeft <= 60) {
      return "#4682B4"; // Blue for medium fuel
    } else {
      return "#32CD32"; // Green for high fuel
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="w-full h-full bg-red-500 flex flex-row">
      {/* Left Side */}
      <div className="w-full bg-orange-500 h-full">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Truck Gasoline Levels</h2>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={truckData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="name" /> */}
              <YAxis />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="gasLeft" stackId="a" fill="#8884d8" />
              <Bar dataKey="maxCapacity" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/5 bg-blue-500 h-full">Right</div>
    </div>
  );
};

export default page;
