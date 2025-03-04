"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";

const TopNav = () => {
  return (
    <div className="sticky top-0 z-50 flex h-fit w-screen flex-row items-center bg-blue-100 px-2 py-2">
      {/* Title and Logo */}
      <TitleLogo />
      {/* Navigation Bar */}
      <div className="flexrow flex h-full w-full justify-start">
        <NavItem icon={"cuida:home-outline"} name={"Home"} />
        <NavItem icon={"cuida:map-pin-outline"} name={"Tracking"} />
        <NavItem icon={"cuida:key-outline"} name={"Vehicle"} />
        <NavItem icon={"cuida:clipboard-text-outline"} name={"Reports"} />
      </div>
      {/* Account Dropdown */}
      <AccountOptions />
    </div>
  );
};

const TitleLogo = () => {
  return (
    <div className="flex h-fit w-fit flex-row gap-3 rounded-xl bg-blue-200 p-3 whitespace-nowrap">
      {/* Logo */}
      <Icon icon="mynaui:truck" className="text-5xl text-blue-500" />

      {/* Title and Subtitle */}
      <div className="flex h-full flex-col justify-center gap-1">
        <h1 className="text-xl font-bold text-blue-500">Vehicle Tracking</h1>
        <p className="text-xs font-light text-black">Fleet Management System</p>
      </div>
    </div>
  );
};

const NavItem = ({ icon, name }) => {
  return (
    <div className="flex h-full w-fit flex-row items-center gap-2 p-4">
      <Icon icon={icon} className="text-2xl text-black" />
      <p className="text-black">{name}</p>
    </div>
  );
};

const AccountOptions = () => {
  const { user } = useAuth();

  // Determine what text to display
  const displayName = user ? user.name || user.email || "User" : "Guest";

  return (
    <div className="flex h-fit flex-row items-center gap-2 rounded-2xl p-4">
      <p className="whitespace-nowrap text-black">{displayName}</p>
      <Icon icon={"cuida:caret-down-outline"} className="text-black" />
    </div>
  );
};

export default TopNav;
