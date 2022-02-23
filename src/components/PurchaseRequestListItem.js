import React from "react";
import {
  Table,
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

  rows = [
    this.createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    this.createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    this.createData("Eclair", 262, 16.0, 24, 6.0),
    this.createData("Cupcake", 305, 3.7, 67, 4.3),
    this.createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

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
    let tableRows = this.state.purchaseRequest.items.map((element, index) => {
      return (
        <tr key={index}>
          <td width={"5%"} align="center">
            {element.serialNo}
          </td>

          <td width={"35%"} align="center">
            {element.particular}
          </td>

          <td width={"25%"} align="center">
            {element.rate}
          </td>

          <td width={"10%"} align="center">
            {element.quantity}
          </td>

          <td width={"25%"} align="center">
            {element.total}
          </td>
        </tr>
      );
    });

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
