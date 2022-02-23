import React, { useState, useEffect } from "react";
import {
  purchaseOrdersFormatted,
  purchaseRequestsFormatted,
} from "../../../SheetProcessor";
import PurchaseOrderListItem from "./PurchaseOrderListItem";
import { fetchOrders } from "../../../service/gapiManager";

import { CircularProgress } from "@mui/material";
var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseOrderList() {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    fetchOrders().then(() => {
      setStatus({ ...initialStatus, loading: false });
    });
  }, []);

  if (status.loading) buildLoadingIndicator();

  var purchaseOrderViews = [];

  purchaseOrdersFormatted.forEach((element, index) => {
    purchaseOrderViews.push(
      <PurchaseOrderListItem purchaseOrder={element} key={index} />
    );
  });
  return <div>{purchaseOrderViews}</div>;
}

function buildLoadingIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </div>
  );
}
