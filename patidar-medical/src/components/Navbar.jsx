import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/generate-bill", label: "Generate Bill" },
    { to: "/all-bills", label: "All Bills" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center p-4 bg-primary text-white">
        <h1 className="text-xl font-bold">Patidar Medical Store</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-semibold ${isActive ? "border-b-4" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger for small screens */}
        <button
          className="md:hidden focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <IoMenu className="text-3xl "/>
        </button>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-primary">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-gray-600"
          >
            <IoClose className="text-2xl cursor-pointer hover:text-primary" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium text-lg px-2 py-1 rounded transition ${
                  isActive ? "text-primary font-bold" : "text-gray-700"
                } hover:bg-primary hover:text-white`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
