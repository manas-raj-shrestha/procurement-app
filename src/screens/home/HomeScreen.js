import React from "react";

import {Box, Tabs, Tab ,Typography} from '@mui/material';
import { Link } from "react-router-dom";
import {fetchPrRequests} from '../../service/gapiManager';
import {goodsReceived, purchaseOrdersFormatted, purchaseRequestsFormatted} from '../../SheetProcessor';
import PurchaseRequestList from './components/PurchaseRequestList';



 

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      goodsReceived: [],
      purchaseOrders: [],
      purchaseRequests: [],
    };
  }

  initCallback = ()=>{
    this.setState({
      purchaseRequests: purchaseRequestsFormatted,
      isLoading: false,
    });

    this.setState({
      purchaseOrders: purchaseOrdersFormatted,
      isLoading: false,
    });

    this.setState({
      goodsReceived: goodsReceived,
      isLoading: false,
    });
  }

  fetchPurchaseRequests() {

    fetchPrRequests().then(()=>{
      this.setState({
        purchaseRequests: purchaseRequestsFormatted,
        isLoading: false,
      });
    });
  
  }

   handleChange = (event, newValue) => {
 
  };

   handleChangeIndex = (index) => {
    // setValue(index);
  };

  componentDidMount() {
    this.fetchPurchaseRequests();
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return   <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    <Tabs value={0} onChange={this.handleChange} centered>
      <Tab label="Purchase Requests" />
      <Tab label="Purchase Orders" />
      <Tab label="Goods Received" />
    </Tabs>
    <PurchaseRequestList/>
    <div>ABCD</div>

  </Box>

   
  }

  
}

export default HomeScreen;
