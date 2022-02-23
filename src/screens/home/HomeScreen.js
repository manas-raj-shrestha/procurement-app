import React, { useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";

import GoodsReceivedList from "./components/GoodsReceivedList";
import PurchaseOrderList from "./components/PurchaseOrdertList";

import PurchaseRequestList from "./components/PurchaseRequestList";


export default function HomeScreen() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getComponent = () => {
    switch (value) {
      case 0:
        return <PurchaseRequestList />;
      case 1:
        return <PurchaseOrderList/>;
      case 2:
        return <GoodsReceivedList/>;
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Purchase Requests" />
        <Tab label="Purchase Orders" />
        <Tab label="Goods Received" />
      </Tabs>
      {getComponent()}
    </Box>
  );
}
