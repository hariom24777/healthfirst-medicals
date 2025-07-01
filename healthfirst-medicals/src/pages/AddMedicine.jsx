import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    const newMed = {
      id: Date.now(),
      name,
      category,
      manufacturer,
      price: Number(price),
    };
    const meds = JSON.parse(localStorage.getItem("medicines")) || [];
    localStorage.setItem("medicines", JSON.stringify([...meds, newMed]));
    navigate("/admin");
  };

  return (
    <div className="px-6 py-12 max-w-md mx-auto mt-12 border border-gray-300 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-primary">Add Medicine</h2>
      <input
        className="border border-gray-300 p-2 w-full mb-2"
        placeholder="Medicine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-2"
        type="text"
        placeholder="Category (e.g. Tablet)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-2"
        type="text"
        placeholder="Manufacturer Name"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-2"
        type="number"
        min={1}
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className="bg-primary hover:bg-primary-variant text-white w-full px-4 py-2 mt-4 mb-2 rounded cursor-pointer transition-all duration-300"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddMedicine;
