import React from "react";
import ProtectedAdmin from "./components/ProtectedAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/admin" element={<ProtectedAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
