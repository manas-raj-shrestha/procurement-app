import React from "react";
import PurchaseRequestListItem from "../components/PurchaseRequestListItem";
import PurchaseOrderRequests from "../components/PurchaseOrderListItem";
import GoodsReceivedListItem from "../components/GoodsReceivedListItem";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import {fetchPrRequests} from '../service/gapiManager';
import {goodsReceived, purchaseOrdersFormatted, purchaseRequestsFormatted} from '../SheetProcessor';


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

  loadAuthAndPicker() {
    //load from apimanager here
    // initGapis(this.initCallback);
    console.log('here');

    fetchPrRequests().then(()=>{
      this.setState({
        purchaseRequests: purchaseRequestsFormatted,
        isLoading: false,
      });
    });
  
  }

  componentDidMount() {
    console.log('mounted');
    this.loadAuthAndPicker();
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const prViews = [];

    this.state.purchaseRequests.forEach((element, index) => {
      prViews.push(
        <PurchaseRequestListItem purchaseRequest={element} key={index} />
      );
    });

    const prOrder = [];

    this.state.purchaseOrders.forEach((element, index) => {
      prOrder.push(
        <PurchaseOrderRequests purchaseOrder={element} key={index} />
      );
    });

    const goodsReceived = [];

    this.state.goodsReceived.forEach((element, index) => {
      goodsReceived.push(
        <GoodsReceivedListItem purchaseOrder={element} key={index} />
      );
    });

    return (
   <div>  <Tabs>
        <TabList
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#d5d5d5",
          }}
        >
          <Tab>Procurement Requests</Tab>
          <Tab>Procurement Orders</Tab>
          <Tab>Goods Received</Tab>
        </TabList>

        <TabPanel>
          <div>{prViews}</div>
        </TabPanel>

        <TabPanel>
          <div>{prOrder}</div>
        </TabPanel>

        <TabPanel>
          <div>{goodsReceived}</div>
        </TabPanel>
      </Tabs>
      <Link to="/purchase-request">Create New</Link>
      </div> 
      
    );
  }

  
}

export default HomeScreen;
