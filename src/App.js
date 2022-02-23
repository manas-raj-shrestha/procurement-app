import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NewPrRequestScreen from "./screens/NewPrRequestScreen";
import PurchaseRequest from "./screens/purchase-request/PurchaseRequest";
import { initGapis } from "./service/gpiManager";

export default class App extends React.Component {

constructor(props){
  super(props);  
  this.state = {
    gapiInitialized: false
  }
}
  componentDidMount() {
    console.log('Did mount');
    initGapis(this.initializationCallback);
  }

  initializationCallback = () => {
    console.log('set state');
    this.setState({gapiInitialized: true});
  };

  render() {
   
console.log('rendering');
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
