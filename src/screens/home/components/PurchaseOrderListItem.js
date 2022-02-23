import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

class PurchaseRequestListItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            purchaseOrder : props.purchaseOrder
        }
    }

    render(){

        let tableRows = this.state.purchaseOrder.items.map((element, index)=>{

        return <tr key={index} >
          <td width={'5%'} align='center'>{element.serialNo}</td>
        
          <td width={'25%'} align='center'>{element.particular}</td>
  
          <td width={'15%'} align='center'>{element.rate}</td>
  
          <td width={'10%'} align='center'>{element.quantity}</td>

          <td width={'15%'} align='center'>{element.total}</td>

          <td width={'15%'} align='center'>{element.vatTotal}</td>

          <td width={'15%'} align='center'>{element.grandTotal}</td>
          </tr>
        });

        return (<div className="App" style={{padding: 24, textAlign: 'start'}}>  
  
        <div style={headerWrapperStyle}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>Procurement Request #: {this.state.purchaseOrder.prNo}</div>
          <div>Request Date: {this.state.purchaseOrder.date}</div>
          <div>Fiscal Year: {this.state.purchaseOrder.fiscalYear}</div>
        </div>
  
        <div>
        <div>Procurement Order #: {this.state.purchaseOrder.poNumber}</div>
          <div>Vendor: {this.state.purchaseOrder.vendor}</div>
          <div>Department: {this.state.purchaseOrder.department}</div>
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
              {this.state.purchaseOrder.items.map((element, index) => (
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
                key={this.state.purchaseOrder.items.length}
               
              >
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
            
                <TableCell>Grand Total: {this.state.purchaseOrder.grandTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
      </div>)
    }

}

const headerWrapperStyle = {display: 'flex', justifyContent: 'space-between'};


export default PurchaseRequestListItem;