import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditMedicine = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const meds = JSON.parse(localStorage.getItem("medicines")) || [];
    const med = meds.find((m) => m.id === Number(id));
    if (med) {
      setName(med.name);
      setCategory(med.category);
      setManufacturer(med.manufacturer);
      setPrice(med.price);
    }
  }, [id]);

  const handleUpdate = () => {
    // Basic validation to check for empty fields
    if (!name.trim() || !category.trim() || !manufacturer.trim() || !price) {
      alert("Please fill all the details before updating.");
      return;
    }

    const meds = JSON.parse(localStorage.getItem("medicines")) || [];
    const updated = meds.map((m) =>
      m.id === Number(id)
        ? { ...m, name, manufacturer, category, price: Number(price) }
        : m
    );
    localStorage.setItem("medicines", JSON.stringify(updated));
    navigate("/admin");
  };

  return (
    <div className="p-6 max-w-md mx-auto border border-gray-300 shadow-md rounded-md mt-6">
      <h2 className="text-xl text-center font-bold mb-4">Edit Medicine</h2>
      <input
        className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring focus:ring-primary"
        type="text"
        placeholder="Medicine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring focus:ring-primary"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring focus:ring-primary"
        type="text"
        placeholder="Manufacturer Name"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring focus:ring-primary"
        type="number"
        min={1}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className=" w-full bg-primary hover:bg-primary-variant text-white px-4 py-2 mt-4 rounded transition-all duration-300 cursor-pointer"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditMedicine;
