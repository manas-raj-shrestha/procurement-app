import React, { useState, useEffect } from "react";
import {
  purchaseOrdersFormatted,
  purchaseRequestsFormatted,
} from "../../../SheetProcessor";
import PurchaseRequestListItem from "../../../components/PurchaseRequestListItem";
import { fetchPrRequests } from "../../../service/gapiManager";

import { CircularProgress } from "@mui/material";
var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseRequestList() {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    fetchPrRequests().then(() => {
      setStatus({ ...initialStatus, loading: false });
    });
  }, []);

  if (status.loading) buildLoadingIndicator();

  var purchaseRequestViews = [];

  purchaseRequestsFormatted.forEach((element, index) => {
    purchaseRequestViews.push(
      <PurchaseRequestListItem purchaseRequest={element} key={index} />
    );
  });
  return <div>{purchaseRequestViews}</div>;
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
