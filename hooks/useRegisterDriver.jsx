import React, { useState } from 'react'
import { pb } from "../lib/pocketbase";

const useRegisterDriver = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerDriver = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await pb.collection("drivers").create(formData);
    } catch (error) {
      setError("Error creating driver")
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  return {registerDriver, loading, error}
};

export default useRegisterDriver