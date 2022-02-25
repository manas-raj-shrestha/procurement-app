import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { fetchPrRequests } from "../../service/gapiManager";
import { purchaseRequestsFormatted } from "../../SheetProcessor";
import PurchaseRequestListItem from "../home/components/PurchaseRequestListItem";
import { Button } from "@mui/material";

var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseRequest() {
  const { id } = useParams();
  const [status, setStatus] = useState(initialStatus);
  const navigate = useNavigate();

  useEffect(
    () =>
      {
        fetchPrRequests().then(() => {
        setStatus({ ...initialStatus, loading: false });
      });},
    []
  );

  if (status.loading) buildLoadingIndicator();

  if(purchaseRequestsFormatted.get(id))

  return (
  <div>  
    <PurchaseRequestListItem
      purchaseRequest={purchaseRequestsFormatted.get(id)}
    />
    <div align="right">
    <Button
      variant="contained"
      style={{ marginRight: 24, marginBottom: 24 }}
      onClick={() => navigate("/purchase-order/new",{state: purchaseRequestsFormatted.get(id)} )}
    >
      Generate Purchase Order
    </Button>
  </div></div>
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
