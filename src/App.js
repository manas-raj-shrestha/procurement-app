import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import PurchaseOrder from "./screens/purchase-order/PurchaseOrder";
import NewPrRequestScreen from "./screens/purchase-request/new-purchase-request/NewPrRequestScreen";
import PurchaseRequest from "./screens/purchase-request/PurchaseRequest";
import GoodsReceived from "./screens/goods-received/GoodsReceived";
import { initGapis } from "./service/gapiManager";
import NewPurchaseOrder from './screens/purchase-order/new-purchase-order/NewPurchaseOrder'

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
          <Route path="/purchase-request/new" element={<NewPrRequestScreen />} />
          <Route path="/purchase-order/new" element={<NewPurchaseOrder />} />
          <Route
            path="/purchase-request/:id"
            element={<PurchaseRequest />}
          />
           <Route
            path="/purchase-order/:id"
            element={<PurchaseOrder />}
          /> 

          <Route
            path="/goods-received/:id"
            element={<GoodsReceived />}
          /> 
        </Routes>
      </BrowserRouter>
    );
  }
}
