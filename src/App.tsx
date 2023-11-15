import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LayoutWeb from "./components/Layout";
import PageDetail from "./pages/PageDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWeb />}>
          <Route path="home" index element={<Home />}></Route>
          <Route path="page/:key" element={<PageDetail />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
