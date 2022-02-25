import React, { useState, useEffect } from "react";
import { purchaseRequestsFormatted } from "../../../SheetProcessor";
import PurchaseRequestListItem from "./PurchaseRequestListItem";
import { fetchPrRequests } from "../../../service/gapiManager";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { CircularProgress, Button } from "@mui/material";
var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseRequestList() {
  const [status, setStatus] = useState(initialStatus);
  const navigate = useNavigate();

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
  return (
    <div>
      {purchaseRequestViews}
      <div align="right">
        <Button
          variant="contained"
          style={{ marginRight: 24, marginBottom: 24 }}
          onClick={() => navigate("/purchase-request/new")}
        >
          Add New
        </Button>
      </div>
    </div>
  );
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
