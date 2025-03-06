import { useState } from "react";

const ModalDriver = ({ isOpen, onClose }) => {
  // Prevent render if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center w-full h-full bg-black/50"
      onClick={onClose}
    >
      <div
        className="h-4/5 w-4/5 rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        Test
      </div>
    </div>
  );
};

export default ModalDriver;
