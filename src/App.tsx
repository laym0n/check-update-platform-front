import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { SearchPage } from "src/pages/search";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage/>}/>
          <Route path="*" element={<h3>404</h3>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
