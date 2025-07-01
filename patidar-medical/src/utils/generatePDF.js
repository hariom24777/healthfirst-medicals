import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Generate next bill number and store it
const getBillNumber = () => {
  const lastBillNo = Number(localStorage.getItem("lastBillNo") || "1000");
  const newBillNo = lastBillNo + 1;
  localStorage.setItem("lastBillNo", newBillNo);
  return newBillNo;
};

const saveBillData = (bill) => {
  const existingBills = JSON.parse(localStorage.getItem("bills")) || [];
  existingBills.push(bill);
  localStorage.setItem("bills", JSON.stringify(existingBills));
};

const formatDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

const generatePDF = async (
  items,
  total,
  patientName,
  mobile,
  dateParam,
  billNoParam
) => {
  const billNo =
    billNoParam || Number(localStorage.getItem("lastBillNo") || 1000) + 1;
  const billDate = dateParam || formatDate();

  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("Patidar Medical Store", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text("GSTIN: 22ABCDE1234F1Z5", 105, 22, { align: "center" });
  doc.text("Contact: +91 98765 43210", 105, 28, { align: "center" });

  doc.text(`Date: ${billDate}`, 14, 35);
  doc.setFontSize(12);
  doc.text(`Patient Name: ${patientName}`, 14, 42);
  doc.text(`Mobile No.: ${mobile}`, 14, 50);
  doc.text(`Bill No.: ${billNo}`, 160, 46);

  // Prepare table rows
  const tableData = items.map((item, index) => [
    index + 1,
    item.name,
    item.manufacturer,
    item.category,
    `Rs. ${item.price.toFixed(2)}`,
    item.quantity,
    `Rs. ${item.price * item.quantity.toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 58,
    head: [
      [
        "#",
        "Name",
        "Manufacturer",
        "Category",
        "Price (Rs.)",
        "Qty",
        "Total (Rs.)",
      ],
    ],
    body: tableData,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255,
    },
    theme: "striped",
  });

  // Final Total
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total Amount: Rs. ${total.toFixed(2)}`, 14, finalY);
  doc.setFontSize(12);
  doc.text("Thank you for your purchase!", 105, finalY + 20, {
    align: "center",
  });

  // Save data
  if (!billNoParam) {
    localStorage.setItem("lastBillNo", billNo);
    saveBillData({
      billNo,
      date: billDate,
      patientName,
      mobile,
      items,
      total: total.toFixed(2),
    });
  }

  // Save file
  doc.save(`bill_${billNo}.pdf`);
};

export default generatePDF;
