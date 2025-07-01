const MedicineCard = ({ medicine }) => (
  <div className="rounded-lg p-4 shadow-md border border-gray-300 transition-all duration-300 bg-white">
    <h2 className="text-lg font-semibold text-blue-700">{medicine.name}</h2>
    <p className="text-sm text-gray-600">Category: {medicine.category}</p>
    <p className="text-sm text-gray-500 italic">{medicine.manufacturer}</p>
    <p className="text-xl font-bold text-green-600 mt-2">₹{medicine.price}</p>
  </div>
);


export default MedicineCard;
