import {  Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import Login from "./pages/Login";
import GenerateBill from "./pages/GenerateBill";
import Navbar from "./components/Navbar";
import AllBills from "./pages/AllBills";

const isAuthenticated = () => localStorage.getItem("admin") === "true";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={isAuthenticated() ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/add"
          element={
            isAuthenticated() ? <AddMedicine /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            isAuthenticated() ? <EditMedicine /> : <Navigate to="/login" />
          }
        />
        <Route path="/generate-bill" element={<GenerateBill />} />
        
        <Route path="/all-bills" element={<AllBills />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
