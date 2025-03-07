import { useState } from "react";
import { pb } from "../lib/pocketbase";

const useRegisterFleet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerFleet = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await pb.collection("fleets").create(formData);
    } catch (err) {
      setError("Error creating fleet.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { registerFleet, loading, error };
};

export default useRegisterFleet;