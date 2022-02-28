import {
  parsePurchaseRequestsFromSheets,
  parsePurchaseOrderFromSheets,
  parseGoodsReceivedFromSheets,
} from "../SheetProcessor";
import Cookies from "universal-cookie";

var clientId =
  "692551935906-7cdtb8e7dd8etp6na2hf2b2d6rdre5g9.apps.googleusercontent.com";

var scope =
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file";
var oauthToken;
var appId = "692551935906";
var pickerApiLoaded = false;
var developerKey = "AIzaSyDBUdpU_M2NH96pOOwZHWPKmTSJImzmRR8";
var selectedFileId;
var DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

var initCallback;
var fieldId;

const cookies = new Cookies();

function initGapis(initializationCallback) {
  initCallback = initializationCallback;

  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js";

  script.onload = () => {
    window.gapi.load("client", () => {
      window.gapi.client
        .init({
          apiKey: developerKey,
          clientId: clientId,
          scope: scope,
          discoveryDocs: DISCOVERY_DOCS,
        })
        .then(
          () => {
            window.gapi.load("auth", { callback: onAuthApiLoad });
            window.gapi.load("picker", { callback: onPickerApiLoad });
          },
          (error) => {
            console.log(error);
          }
        );
    });
  };

  document.body.appendChild(script);
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function loadAuthPicker(){
      window.gapi.auth.authorize(
        {
          client_id: clientId,
          scope: scope,
          discoveryDocs: DISCOVERY_DOCS,
          immediate: false,
        },
        handleAuthResult
      );
}

function onAuthApiLoad() {
  window.gapi.auth.checkSessionState({ client_id: clientId }, (stte) => {

    if(stte || window.gapi.auth.getToken() == null){
      initCallback(false);
    }else{
      oauthToken = window.gapi.auth.getToken().access_token;

      if(oauthToken  == undefined){
        window.gapi.auth.setToken(null);
        window.gapi.auth.signOut();
      }

      createPicker();
      
    } 
  });
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  } else {
    console.log("handleAuthResult:" + authResult.error);
  }
}

function createPicker() {
  if (typeof cookies.get("sheetId") == "undefined") {
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
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }
  } else {
    fieldId = cookies.get("sheetId");
    console.log("going back");
    initCallback(true);
  }
}

function pickerCallback(data) {
  if (data.action == window.google.picker.Action.PICKED) {
    selectedFileId = data.docs[0].id;
    fieldId = selectedFileId;
    cookies.set("sheetId", selectedFileId, { path: "/" });

    initCallback(true);
  }
}

async function fetchPrRequests() {
  var requests = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: fieldId,
    range: "purchase-request!A2:K",
  });

  parsePurchaseRequestsFromSheets(requests.result.values);
}

async function fetchOrders() {
  var orders = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: fieldId,
    range: "purchase-order!A2:M",
  });

  parsePurchaseOrderFromSheets(orders.result.values);
}

async function fetchGoodsReceived() {
  var received = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: fieldId,
    range: "goods-received!A2:O",
  });

  parseGoodsReceivedFromSheets(received.result.values);
}

export { initGapis, fetchPrRequests, fetchOrders, fetchGoodsReceived,loadAuthPicker };
