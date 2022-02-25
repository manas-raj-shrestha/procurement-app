import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { fetchGoodsReceived } from "../../service/gapiManager";
import { goodsReceived } from "../../SheetProcessor";
import GoodsReceivedListItem from "../home/components/GoodsReceivedListItem";

var initialStatus = {
  loading: true,
  error: false,
};

export default function PurchaseRequest() {
  const { id } = useParams();
  const [status, setStatus] = useState(initialStatus);

  useEffect(
    () =>
      {
        fetchGoodsReceived().then(() => {
        setStatus({ ...initialStatus, loading: false });
      });},
    []
  );

  if (status.loading) buildLoadingIndicator();

  if(goodsReceived.get(id))

  return (
    <GoodsReceivedListItem
    goodsReceived={goodsReceived.get(id)}
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
