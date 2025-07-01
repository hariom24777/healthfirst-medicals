import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Admin = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(data);
  }, []);

  const handleDelete = (id) => {
    const updated = medicines.filter((m) => m.id !== id);
    localStorage.setItem("medicines", JSON.stringify(updated));
    setMedicines(updated);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-400 text-white px-4 py-1 rounded cursor-pointer transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Add Button */}
      <Link
        to="/admin/add"
        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded inline-block mb-4 transition-all duration-300"
      >
        Add New Medicine
      </Link>

      {/* Medicines List */}
      <ul>
        {medicines.map((m) => (
          <li
            key={m.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300 p-3 mb-2 rounded"
          >
            <span className="text-sm sm:text-base font-medium mb-2 sm:mb-0">
              {m.name} | {m.category} | {m.manufacturer} - ₹{m.price}
            </span>

            {/* Buttons Block */}
            <div className="w-full sm:w-auto flex justify-start sm:justify-end">
              <div className="flex gap-2">
                <Link
                  to={`/admin/edit/${m.id}`}
                  className="flex items-center bg-primary hover:bg-primary-variant text-white px-3 py-1 rounded transition-all duration-300 text-sm"
                >
                  <span className="sm:hidden">
                    <FaEdit />
                  </span>
                  <span className="hidden sm:inline">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="flex items-center bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded transition-all duration-300 cursor-pointer text-sm"
                >
                  <span className="sm:hidden">
                    <FaTrash />
                  </span>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
