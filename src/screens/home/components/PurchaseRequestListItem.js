import React, { useState } from "react";

import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


import { useNavigate } from "react-router-dom";

export default function PurchaseRequestListItem(props){
  const [purchaseRequest, setPurchaseRequest] = useState(props.purchaseRequest);
  const navigate = useNavigate();

  const getTotalPricing = ()=> {
    let total = 0;
    purchaseRequest.items.forEach((item) => {
      total += parseInt(item.total);
    });
    return total;
  }

  const onItemClicked = ()=>{
  navigate("/purchase-request/"+purchaseRequest.prNo);
    console.log('clicked');
  }


  return (
    <div className="App" onClick={onItemClicked} style={{ padding: 24, textAlign: "start" }}>
      <div style={headerWrapperStyle}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Procurement Request #: {purchaseRequest.prNo}</div>
          <div>Request Date: {purchaseRequest.date}</div>
          <div>Fiscal Year: {purchaseRequest.fiscalYear}</div>
        </div>

        <div>
          <div>Requested By: {purchaseRequest.requestedBy}</div>
          <div>Department: {purchaseRequest.department}</div>
        </div>
      </div>
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SerialNo</TableCell>
              <TableCell>Particular</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseRequest.items.map((element, index) => (
              <TableRow
                key={index}
              >
                <TableCell component="th" scope="row">
                  {element.serialNo}
                </TableCell>
                <TableCell>{element.particular}</TableCell>
                <TableCell>{element.rate}</TableCell>
                <TableCell>{element.quantity}</TableCell>
                <TableCell>{element.total}</TableCell>
              </TableRow>
            ))}
            <TableRow
              key={purchaseRequest.items.length}
             
            >
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

