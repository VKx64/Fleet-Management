import { useState, useEffect } from "react";
import useRegisterFleet from "@/hooks/useRegisterFleet";
import { useAuth } from "@/contexts/AuthContext";

const ModalFleet = ({ isOpen, onClose, selectedDriver }) => {
  const { registerFleet, loading, error } = useRegisterFleet();
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const [formData, setFormData] = useState({
    plate: "",
    driver: selectedDriver.id, // Set the driver to the selected driver's ID
    image: null, // Add image to the form data
  });

  useEffect(() => {
    if (selectedDriver) {
      setFormData((prevData) => ({
        ...prevData,
        driver: selectedDriver.id,
      }));
    }
  }, [selectedDriver]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("plate", formData.plate);
    data.append("driver", formData.driver);
    if (formData.image) {
      data.append("image", formData.image);
    }
    await registerFleet(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex h-full w-full items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="flex h-fit w-fit flex-col gap-5 rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold text-black">New Fleet Form</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Plate Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Plate?</legend>
            <input
              type="text"
              name="plate"
              className="input"
              placeholder="Type here"
              value={formData.plate}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Upload Image File Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Upload Image</legend>
            <input
              type="file"
              name="image"
              className="file-input overflow-clip"
              onChange={handleFileChange}
            />
          </fieldset>

          {/* Form Buttons */}
          <div className="mt-4 flex justify-start gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFleet;