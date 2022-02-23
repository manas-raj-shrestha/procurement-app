import React from "react";
import {Link}from 'react-router-dom';
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

class PurchaseRequestListItem extends React.Component {
  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  
  constructor(props) {
    super(props);

    this.state = {
      purchaseRequest: props.purchaseRequest,
    };
  }

  getTotalPricing() {
    let total = 0;
    this.state.purchaseRequest.items.forEach((item) => {
      total += parseInt(item.total);
    });
    return total;
  }

  render() {
   

    return (
      <div className="App" style={{ padding: 24, textAlign: "start" }}>
        <div style={headerWrapperStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Procurement Request #: {this.state.purchaseRequest.prNo}</div>
            <div>Request Date: {this.state.purchaseRequest.date}</div>
            <div>Fiscal Year: {this.state.purchaseRequest.fiscalYear}</div>
          </div>

          <div>
            <div>Requested By: {this.state.purchaseRequest.requestedBy}</div>
            <div>Department: {this.state.purchaseRequest.department}</div>
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
              {this.state.purchaseRequest.items.map((element, index) => (
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
                key={this.state.purchaseRequest.items.length}
               
              >
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>Grand Total: {this.getTotalPricing()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

       
      </div>
    );
  }

  activateLasers() {}
}

const headerWrapperStyle = { display: "flex", justifyContent: "space-between" };

export default PurchaseRequestListItem;
