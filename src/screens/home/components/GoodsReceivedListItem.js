import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function GoodsReceivedListItem(props) {
  const navigate = useNavigate();
  const [goodsReceived, setGoodsReceived] = useState(props.goodsReceived);

  const onItemClicked = () => {
    navigate("/goods-received/" + goodsReceived.grNumber);
   
  };

  const getTotalPricing = () => {
    let total = 0;
    goodsReceived.items.forEach((item) => {
      total += parseInt(item.vatAddedUnitPrice);
    });
    return total;
  };

  return (
    <div
      className="App"
      onClick={onItemClicked}
      style={{ padding: 24, textAlign: "start" }}
    >
      <div style={headerWrapperStyle}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Procurement Request #: {goodsReceived.prNo}</div>
          <div>Request Date: {goodsReceived.date}</div>
          <div>Fiscal Year: {goodsReceived.fiscalYear}</div>
        </div>

        <div>
          <div>Procurement Order #: {goodsReceived.poNumber}</div>
          <div>Vendor: {goodsReceived.vendor}</div>
          <div>Department: {goodsReceived.department}</div>
        </div>

        <div style={{ flexDirection: "column" }}>
          <div>Good Received #: {goodsReceived.grNumber}</div>
          <div>Invoice #: {goodsReceived.invoiceNumber}</div>
        </div>
      </div>
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SerialNo</TableCell>
              <TableCell>Particular</TableCell>
              <TableCell>Ordered Quantity</TableCell>
              <TableCell>Delievered Quantity</TableCell>

              <TableCell>Unit</TableCell>
              <TableCell>VAT added Unit</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsReceived.items.map((element, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {element.serialNo}
                </TableCell>
                <TableCell>{element.particular}</TableCell>

                <TableCell>{element.quantity}</TableCell>
                <TableCell>{element.deliveredQuantity}</TableCell>
                <TableCell>{element.unit}</TableCell>
                <TableCell>{element.vatAddedUnitPrice}</TableCell>
                <TableCell>{element.remarks}</TableCell>
              </TableRow>
            ))}
            <TableRow key={goodsReceived.items.length}>
              <TableCell />
              <TableCell />

              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>Grand Total: {getTotalPricing()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const headerWrapperStyle = { display: "flex", justifyContent: "space-between" };
