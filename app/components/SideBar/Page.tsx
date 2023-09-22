import React from "react";
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-full bg-gray-200 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition duration-300 ease-in-out`}
    >
      {/* Sidebar content */}
    </div>
  );
};

export default Sidebar;
