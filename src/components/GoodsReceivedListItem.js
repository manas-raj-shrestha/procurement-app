import React from 'react';



class PurchaseRequestListItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            purchaseOrder : props.purchaseOrder
        }
    }

    getTotalPricing() {
        let total =0;
        this.state.purchaseOrder.items.forEach((item)=>{
            total+= parseInt(item.vatAddedUnitPrice);
        });
        return total;
    }

    render(){

        let tableRows = this.state.purchaseOrder.items.map((element, index)=>{

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
          <div>Procurement Request #: {this.state.purchaseOrder.prNo}</div>
          <div>Request Date: {this.state.purchaseOrder.date}</div>
          <div>Fiscal Year: {this.state.purchaseOrder.fiscalYear}</div>
        </div>

       
  
        <div>
        <div>Procurement Order #: {this.state.purchaseOrder.poNumber}</div>
          <div>Vendor: {this.state.purchaseOrder.vendor}</div>
          <div>Department: {this.state.purchaseOrder.department}</div>
        </div>

        <div style={{ flexDirection: 'column'}}>
          <div>Good Received #: {this.state.purchaseOrder.grNumber}</div>
          <div>Invoice #: {this.state.purchaseOrder.invoiceNumber}</div>
        </div>

     

        </div>
        <br/>
       
  
        <table width={'100%'} >
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
        <div style={{height: 1, backgroundColor:'#d5d5d5', marginTop: '16px'}}></div>
      </div>)
    }

}

const headerWrapperStyle = {display: 'flex', justifyContent: 'space-between'};


export default PurchaseRequestListItem;