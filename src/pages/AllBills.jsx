import { useEffect, useState } from "react";
import generatePDF from "../utils/generatePDF";
import { IoClose } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";


const AllBills = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(stored.reverse());
  }, []);

  const filteredBills = bills.filter((bill) => {
    const keyword = searchTerm.toLowerCase();
    return (
      bill.billNo.toString().includes(keyword) ||
      bill.patientName.toLowerCase().includes(keyword) ||
      bill.mobile.includes(keyword) ||
      bill.date.includes(keyword)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bills</h2>

      {/* Search Bill */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <label
          htmlFor="searchBill"
          className="border-b-4 border-b-primary-variant  md:text-lg"
        >
          Search Bill :
        </label>
        <input
          name="searchBill"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Bill No, Name, Mobile or Date"
          className="border border-gray-300 p-2 rounded w-full md:w-1/2 focus:outline-none focus:ring focus:ring-primary"
        />
      </div>

      {/* Bills Table */}
      <div className="overflow-auto">
        <table className="w-full border-">
          <thead>
            <tr className="bg-primary-variant text-white">
              <th className="border border-gray-300 px-2 py-2">Bill No</th>
              <th className="border border-gray-300 px-2 py-2">Date</th>
              <th className="border border-gray-300 px-2 py-2">Patient Name</th>
              <th className="border border-gray-300 px-2 py-2">Mobile</th>
              <th className="border border-gray-300 px-2 py-2">Total (₹)</th>
              <th className="border border-gray-300 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.billNo} className="text-sm text-center border-b">
                <td className="border border-gray-300 px-2 py-1">
                  {bill.billNo}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {bill.date}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {bill.patientName}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {bill.mobile}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  ₹{bill.total}
                </td>
                <td className="border border-gray-300 px-2 py-1 ">
                  <div className="flex justify-center items-center gap-4">
                    <button
                      className="bg-primary hover:bg-primary-variant text-white px-2 py-1 rounded cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedBill(bill)}
                    >
                      <span className="hidden md:inline">View</span>
                      <span className="inline md:hidden"><IoEye/> </span>
                    </button>

                    <button
                      className="text-white bg-green-600 hover:bg-green-500 px-2 py-1 rounded cursor-pointer transition-all duration-300"
                      onClick={() =>
                        generatePDF(
                          bill.items,
                          parseFloat(bill.total),
                          bill.patientName,
                          bill.mobile,
                          bill.date,
                          bill.billNo
                        )
                      }
                    >
                      <span className="hidden md:inline">Download</span>
                      <span className="inline md:hidden"><IoMdDownload /> </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBills.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* View Bill */}
        {selectedBill && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl relative">
              <button
                onClick={() => setSelectedBill(null)}
                className="w-5 h-5 flex justify-center items-center bg-primary-variant hover:bg-primary text-white absolute top-2 right-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300"
              >
                <IoClose />
              </button>
              <h3 className="text-lg font-bold mb-2 text-center">
                Bill Receipt
              </h3>
              <div className="text-sm space-y-2">
                <p>
                  <strong>Bill No:</strong> {selectedBill.billNo}
                </p>
                <p>
                  <strong>Date:</strong> {selectedBill.date}
                </p>
                <p>
                  <strong>Patient:</strong> {selectedBill.patientName}
                </p>
                <p>
                  <strong>Mobile:</strong> {selectedBill.mobile}
                </p>
                <table className="w-full border mt-4 text-xs">
                  <thead>
                    <tr className="bg-primary-variant text-white text-left">
                      <th className="border border-gray-400 p-1">#</th>
                      <th className="border border-gray-400 p-1">Name</th>
                      <th className="border border-gray-400 p-1">Category</th>
                      <th className="border border-gray-400 p-1">Qty</th>
                      <th className="border border-gray-400 p-1">Price</th>
                      <th className="border border-gray-400 p-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((item, i) => (
                      <tr key={i}>
                        <td className="border border-gray-400 p-1">{i + 1}</td>
                        <td className="border border-gray-400 p-1">{item.name}</td>
                        <td className="border border-gray-400 p-1">{item.category}</td>
                        <td className="border border-gray-400 p-1">{item.quantity}</td>
                        <td className="border border-gray-400 p-1">₹{item.price.toFixed(2)}</td>
                        <td className="border border-gray-400 p-1">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td colSpan="5" className="text-right p-1 border border-gray-400">
                        Total:
                      </td>
                      <td className="border border-gray-400 p-1">₹{selectedBill.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBills;
