import { useEffect, useState } from "react";
import generatePDF from "../utils/generatePDF";

const GenerateBill = () => {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState({});
  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(data);
  }, []);

  const handleToggle = (med) => {
    setSelected((prev) =>
      prev[med.id]
        ? (() => {
            const copy = { ...prev };
            delete copy[med.id];
            return copy;
          })()
        : {
            ...prev,
            [med.id]: { ...med, quantity: 1 },
          }
    );
  };

  const handleQuantityChange = (id, quantity) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: Number(quantity),
      },
    }));
  };

  const selectedItems = Object.values(selected);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Mobile number validation

  const isValidMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number.trim());
  };

  const handleGenerateBill = () => {
    if (!patientName.trim() || !mobile.trim()) {
      alert("Please Enter Billing Details.");
      return;
    }

    if (!isValidMobile(mobile)) {
      alert("Please Enter Valid Mobile Number.");
      return;
    }

    const selectedItems = Object.values(selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }

    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    generatePDF(selectedItems, total, patientName.trim(), mobile.trim());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing Details</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          required
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-primary"
        />
        <input
          required
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-primary"
        />
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Select Medicines</h2>

      <div className="my-4">
        <input
          type="text"
          placeholder="Search Medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 w-full md:w-1/2 rounded focus:outline-none focus:ring focus:ring-primary"
        />
      </div>

      <div className="medicineListBox h-[32vh] overflow-y-auto bg-white border border-gray-300 shadow-md rounded p-4 z-10">
        <h2 className="text-lg font-semibold mb-2">Available Medicines</h2>

        <ul>
          {medicines

            .filter((med) =>
              med.name.toLowerCase().includes(searchTerm.toLowerCase())
            )

            .sort((a, b) => {
              const isSelectedA = !!selected[a.id];
              const isSelectedB = !!selected[b.id];
              return isSelectedB - isSelectedA; 
            })

            .map((med) => (
              <li key={med.id} className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selected[med.id]}
                  onChange={() => handleToggle(med)}
                  className="w-4.5 h-4.5 cursor-pointer"
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span className="flex-1">
                  {med.name} - ₹{med.price}
                </span>
                {selected[med.id] && (
                  <input
                    type="number"
                    min="1"
                    value={selected[med.id].quantity}
                    className="border border-gray-400 px-2 py-1 w-20 rounded focus:outline-none focus:ring focus:ring-primary"
                    onChange={(e) =>
                      handleQuantityChange(med.id, e.target.value)
                    }
                  />
                )}
              </li>
            ))}
        </ul>
      </div>

      <p className="mt-4 text-2xl text-center font-semibold">
        Total:{" "}
        <span className=" font-bold text-green-600">Rs.{total.toFixed(2)}</span>
      </p>

      <div className="flex justify-center">
        <button
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-primary hover:bg-primary-variant text-white  mt-4 px-4 py-2 rounded transition-all duration-300 cursor-pointer"
          onClick={handleGenerateBill}
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
};

export default GenerateBill;
