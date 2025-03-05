import React from "react";

const Drivers = ({ driver, isSelected, onSelect }) => {
  const { id, name, avatar, phone, email } = driver;
  const avatarUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/drivers/${id}/${avatar}`;

  return (
    <div
      className={`flex h-20 w-full cursor-pointer flex-row items-start justify-start gap-2 rounded-2xl py-2 pr-4 pl-2 ${isSelected ? "bg-amber-400" : "bg-amber-200"}`}
      onClick={() => onSelect(driver)}
    >
      <div className="aspect-square h-full">
        <img
          src={avatarUrl}
          alt="Driver"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl whitespace-nowrap text-black">{name}</h1>
        <p className="text-xs text-gray-600">{email}</p>
        <p className="text-xs text-gray-600">+63 {phone}</p>
      </div>
    </div>
  );
};

export default Drivers;
