import React from "react";
import "./App.css";
import PurchaseRequestListItem from "./components/PurchaseRequestListItem";
import PurchaseOrderRequests from "./components/PurchaseOrderListItem";
import GoodsReceivedListItem from "./components/GoodsReceivedListItem";

import {parsePurchaseRequestsFromSheets, parsePurchaseOrderFromSheets,parseGoodsReceivedFromSheets} from './SheetProcessor';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

var clientId =
  "692551935906-7cdtb8e7dd8etp6na2hf2b2d6rdre5g9.apps.googleusercontent.com";
var scope = ["https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/spreadsheets"];
var oauthToken;
var appId = "692551935906";
var pickerApiLoaded = false;
var developerKey = "AIzaSyDBUdpU_M2NH96pOOwZHWPKmTSJImzmRR8";
var selectedFileId;
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true,
      goodsReceived: [] ,
    purchaseOrders: [] ,
    purchaseRequests: []};
  }

  loadAuthAndPicker() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.load("auth", { callback: this.onAuthApiLoad });
        window.gapi.load("picker", { callback: this.onPickerApiLoad });
        window.gapi.client.init({
          apiKey: developerKey,
          clientId: clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: scope
        });
      });
    };

    document.body.appendChild(script);
  }

  onPickerApiLoad = () => {
    pickerApiLoaded = true;
    this.createPicker();
  };

  onAuthApiLoad = () => {
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope: scope,
        discoveryDocs: DISCOVERY_DOCS,
        immediate: false,
      },
      this.handleAuthResult
    );
  };

  handleAuthResult = (authResult) => {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      this.createPicker();
    } else {
      console.log("err " + authResult.error);
    }
  };

  createPicker = () => {
    console.log("Create picker " + pickerApiLoaded);
    if (pickerApiLoaded && oauthToken) {
      var view = new window.google.picker.View(
        window.google.picker.ViewId.SPREADSHEETS
      );
      var picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(new window.google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  };

  pickerCallback = (data) => {
    if (data.action == window.google.picker.Action.PICKED) {
      selectedFileId = data.docs[0].id;
      this.fetchSheetData(selectedFileId);
    }
  };

   fetchSheetData = (fieldId) => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: fieldId,
      range: 'purchase-request!A2:K',
    }).then((response) => {
      var result = response.result;
      
      this.setState({
        purchaseRequests: parsePurchaseRequestsFromSheets(result.values),
        isLoading: false
      });
    });

    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: fieldId,
      range: 'purchase-order!A2:M',
    }).then((response) => {
      var result = response.result;

      
      this.setState({
        purchaseOrders: parsePurchaseOrderFromSheets(result.values),
        isLoading: false
      });
    });

    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: fieldId,
      range: 'goods-received!A2:O',
    }).then((response) => {
      var result = response.result;
      
      this.setState({
        goodsReceived: parseGoodsReceivedFromSheets(result.values),
        isLoading: false
      });
    });
  }

  componentDidMount() {
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

    return <Tabs >
    <TabList style={{display:'flex', justifyContent:  'space-around', backgroundColor: '#d5d5d5'}}>
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
    
  </Tabs>;
  }
}

export default App;
