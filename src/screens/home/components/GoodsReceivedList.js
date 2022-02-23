import React, { useState, useEffect } from "react";
import {
 
  goodsReceived
} from "../../../SheetProcessor";
import GoodsReceivedListItem from "./GoodsReceivedListItem";
import { fetchGoodsReceived } from "../../../service/gapiManager";

import { CircularProgress } from "@mui/material";
var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseOrderList() {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    fetchGoodsReceived().then(() => {
      setStatus({ ...initialStatus, loading: false });
    });
  }, []);

  if (status.loading) buildLoadingIndicator();

  var goodsReceivedViews = [];

  goodsReceived.forEach((element, index) => {
    goodsReceivedViews.push(
      <GoodsReceivedListItem goodsReceived={element} key={index} />
    );
  });
  return <div>{goodsReceivedViews}</div>;
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
