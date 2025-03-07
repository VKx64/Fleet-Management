import { useState, useEffect } from "react";
import useRegisterDriver from "@/hooks/useRegisterDriver";
import { useAuth } from "@/contexts/AuthContext";

const ModalDriver = ({ isOpen, onClose }) => {
  const { registerDriver, loading, error } = useRegisterDriver();
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    avatar: null, // Add avatar to the form data
    admin: "", // Add admin to the form data
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        admin: user.id,
      }));
    }
  }, [user]);

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
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("admin", formData.admin);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    await registerDriver(data);
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
        <h1 className="text-xl font-semibold text-black">New Driver Form</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Full Name?</legend>
            <input
              type="text"
              name="fullName"
              className="input"
              placeholder="Type here"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Email Address Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Email Address?</legend>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Type here"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Phone Number Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Phone Number?</legend>
            <input
              type="tel"
              name="phone"
              className="input"
              placeholder="Type here"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Password Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Password?</legend>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Type here"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Upload Avatar File Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Upload Avatar</legend>
            <input
              type="file"
              name="avatar"
              className="file-input"
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

export default ModalDriver;
