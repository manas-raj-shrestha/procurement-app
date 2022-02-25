import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { fetchOrders } from "../../service/gapiManager";
import { purchaseOrdersFormatted } from "../../SheetProcessor";
import PurchaseOrderListItem from "../home/components/PurchaseOrderListItem";

var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseOrder() {
  const { id } = useParams();
  const [status, setStatus] = useState(initialStatus);

  useEffect(
    () =>
      {
        fetchOrders().then(() => {
        setStatus({ ...initialStatus, loading: false });
      });},
    []
  );

  if (status.loading) buildLoadingIndicator();

  if(purchaseOrdersFormatted.get(id))

  return (
    <PurchaseOrderListItem
      purchaseOrder={purchaseOrdersFormatted.get(id)}
    />
  );

  return <div/>
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
