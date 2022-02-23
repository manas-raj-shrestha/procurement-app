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


class GoodsReceivedListItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            goodsReceived : props.goodsReceived
        }
    }

    getTotalPricing() {
        let total =0;
        this.state.goodsReceived.items.forEach((item)=>{
            total+= parseInt(item.vatAddedUnitPrice);
        });
        return total;
    }

    render(){

        let tableRows = this.state.goodsReceived.items.map((element, index)=>{

        return <tr key={index} >
          <td width={'5%'} align='center'>{element.serialNo}</td>
        
          <td width={'25%'} align='center'>{element.particular}</td>
  
          <td width={'10%'} align='center'>{element.quantity}</td>

          <td width={'10%'} align='center'>{element.deliveredQuantity}</td>

          <td width={'10%'} align='center'>{element.unit}</td>

          <td width={'10%'} align='center'>{element.vatAddedUnitPrice}</td>

          <td width={'15%'} align='center'>{element.remarks}</td>
          </tr>
        });

        return (<div className="App" style={{padding: 24, textAlign: 'start'}}>  
  
        <div style={headerWrapperStyle}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>Procurement Request #: {this.state.goodsReceived.prNo}</div>
          <div>Request Date: {this.state.goodsReceived.date}</div>
          <div>Fiscal Year: {this.state.goodsReceived.fiscalYear}</div>
        </div>

       
  
        <div>
        <div>Procurement Order #: {this.state.goodsReceived.poNumber}</div>
          <div>Vendor: {this.state.goodsReceived.vendor}</div>
          <div>Department: {this.state.goodsReceived.department}</div>
        </div>

        <div style={{ flexDirection: 'column'}}>
          <div>Good Received #: {this.state.goodsReceived.grNumber}</div>
          <div>Invoice #: {this.state.goodsReceived.invoiceNumber}</div>
        </div>

     

        </div>
        <br/>
       
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
              {this.state.goodsReceived.items.map((element, index) => (
                <TableRow
                  key={index}
                >
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
              <TableRow
                key={this.state.goodsReceived.items.length}
               
              >
                <TableCell />
                <TableCell />
              
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>Grand Total: {this.getTotalPricing()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* <table width={'100%'} >
        <thead>
          <tr style={{ backgroundColor:'#d5d5d5'}}>
          <th width={'5%'}>SerialNo</th>
  
          <th width={'25%'}>Particular</th>

          <th width={'10%'}>Ordered Quantity</th>

          <th width={'15%'}>Delievered Quantity</th>
  
          <th width={'15%'}>Unit</th>

          <th width={'10%'}>VAT added Unit</th>

          <th width={'20%'}>Remarks</th>
          </tr>
          </thead>

          <tbody>
          {tableRows}
          </tbody>
        </table>

        <div align='right' style={{ marginTop: '16px'}}>Grand Total: {this.getTotalPricing()}</div>
        <div style={{height: 1, backgroundColor:'#d5d5d5', marginTop: '16px'}}></div> */}
      </div>)
    }

}

const headerWrapperStyle = {display: 'flex', justifyContent: 'space-between'};


export default GoodsReceivedListItem;