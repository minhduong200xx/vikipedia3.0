import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="page/:key" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
