import { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(data);
  }, []);

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat ? m.category === selectedCat : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-4">
      <div className="bg-primary-variant py-10 px-4 text-center rounded-lg shadow mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome to HealthFirst Medicals</h1>
        <p className="text-gray-200 mt-2 text-lg">Your trusted destination for quality healthcare essentials.</p>
      </div>

      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full py-4 px-6 rounded-2xl shadow mb-4 "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(new Set(medicines.map((m) => m.category))).map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border border-gray-300 cursor-pointer ${selectedCat === cat ? "bg-primary-variant text-white" : "bg-gray-50"}`}
            onClick={() => setSelectedCat(cat === selectedCat ? "" : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((m) => <MedicineCard key={m.id} medicine={m} />)}
      </div>
    </div>
  );
};

export default Home;
