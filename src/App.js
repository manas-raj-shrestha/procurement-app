import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import PurchaseOrder from "./screens/purchase-order/PurchaseOrder";
import NewPrRequestScreen from "./screens/purchase-request/new-purchase-request/NewPrRequestScreen";
import PurchaseRequest from "./screens/purchase-request/PurchaseRequest";
import GoodsReceived from "./screens/goods-received/GoodsReceived";
import { initGapis } from "./service/gapiManager";
import NewPurchaseOrder from './screens/purchase-order/new-purchase-order/NewPurchaseOrder'
import Login from "./screens/login/Login";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiInitialized: false,
      userLoggedIn: false
    };
  }

  componentDidMount() {
    initGapis(this.initializationCallback);
  }

  initializationCallback = (loggedIn) => {
   

    if(loggedIn){
      this.setState({ gapiInitialized: true, userLoggedIn: true });
    }else{
      this.setState({ gapiInitialized: true, userLoggedIn: false });
    }
  };

  render() {
    
 
    if (!this.state.gapiInitialized) return null;
    if(!this.state.userLoggedIn) return <Login/>

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* <Route path='/login' element={<Login/>}/> */}
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
