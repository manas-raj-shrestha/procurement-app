import React from 'react';

class PurchaseRequestListItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            purchaseRequest : props.purchaseRequest
        }
    }

    getTotalPricing() {
        let total =0;
        this.state.purchaseRequest.items.forEach((item)=>{
            total+= parseInt(item.total);
        });
        return total;
    }

    render(){

        let tableRows = this.state.purchaseRequest.items.map((element, index)=>{

        return <tr key={index} >
          <td width={'5%'} align='center'>{element.serialNo}</td>
        
          <td width={'35%'} align='center'>{element.particular}</td>
  
          <td width={'25%'} align='center'>{element.rate}</td>
  
          <td width={'10%'} align='center'>{element.quantity}</td>

          <td width={'25%'} align='center'>{element.total}</td>
          </tr>
        });

        return (<div className="App" style={{padding: 24, textAlign: 'start'}}>  
  
        <div style={headerWrapperStyle}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>Procurement Request #: {this.state.purchaseRequest.prNo}</div>
          <div>Request Date: {this.state.purchaseRequest.date}</div>
          <div>Fiscal Year: {this.state.purchaseRequest.fiscalYear}</div>
        </div>
  
        <div>
          <div>Requested By: {this.state.purchaseRequest.requestedBy}</div>
          <div>Department: {this.state.purchaseRequest.department}</div>
        </div>
        </div>
        <br/>
  
        <table width={'100%'} >
        <thead>
          <tr style={{ backgroundColor:'#d5d5d5'}}>
          <th width={'5%'}>SerialNo</th>
  
          <th width={'35%'}>Particular</th>
  
          <th width={'25%'}>Rate</th>

          <th width={'10%'}>Qty</th>
  
          <th width={'25%'}>Total</th>
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