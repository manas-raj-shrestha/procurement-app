import React, {useState} from 'react';

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

export default function PurchaseOrderListItem(props){
  const navigate = useNavigate();
  const [purchaseOrder, setPurchaseOrder] = useState(props.purchaseOrder);

  const onItemClicked = ()=>{
    navigate("/purchase-order/"+purchaseOrder.poNumber);
  }

  return (<div className="App"  onClick={onItemClicked} style={{padding: 24, textAlign: 'start'}}>  
  
  <div style={headerWrapperStyle}>
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div>Procurement Request #: {purchaseOrder.prNo}</div>
    <div>Request Date: {purchaseOrder.date}</div>
    <div>Fiscal Year: {purchaseOrder.fiscalYear}</div>
  </div>

  <div>
  <div>Procurement Order #: {purchaseOrder.poNumber}</div>
    <div>Vendor: {purchaseOrder.vendor}</div>
    <div>Department: {purchaseOrder.department}</div>
  </div>
  </div>
  <br/>

  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>SerialNo</TableCell>
          <TableCell>Particular</TableCell>
          <TableCell>Rate</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>VAT Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {purchaseOrder.items.map((element, index) => (
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
            <TableCell>{element.vatTotal}</TableCell>
          </TableRow>
        ))}
        <TableRow
          key={purchaseOrder.items.length}
         
        >
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
      
          <TableCell>Grand Total: {purchaseOrder.grandTotal}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>

</div>)
}

const headerWrapperStyle = {display: 'flex', justifyContent: 'space-between'};

