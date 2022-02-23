import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import NewPrRequestScreen from "./screens/NewPrRequestScreen";
import PurchaseRequest from "./screens/purchase-request/PurchaseRequest";
import { initGapis } from "./service/gapiManager";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiInitialized: false,
    };
  }

  componentDidMount() {
    initGapis(this.initializationCallback);
  }

  initializationCallback = () => {
    this.setState({ gapiInitialized: true });
  };

  render() {
 
    if (!this.state.gapiInitialized) return null;

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/purchase-request" element={<NewPrRequestScreen />} />
          <Route
            path="/purchase-request/:id"
            element={<PurchaseRequest />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
