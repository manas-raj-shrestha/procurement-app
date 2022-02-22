import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NewPrRequestScreen  from "./screens/NewPrRequestScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/newpr" element={<NewPrRequestScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

