import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import PurchaseRequestListItem from "../../components/PurchaseRequestListItem";
import { purchaseRequestsFormatted } from "../../SheetProcessor";
import { CircularProgressbar } from 'react-circular-progressbar';


export default function PurchaseRequest(){
    const { id } = useParams();
    const {loading, setLoading} = useState(true);

    //call api
    window.gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: '1Cboc6tEgwCCEuPRDHAPwqTc9SWjVYSkhae0hT_C4Cqo',
      range: "purchase-request!A2:K",
    })
    .then((response) => {
      var result = response.result;

    });


    if(loading) return <CircularProgressbar/>
    // return <PurchaseRequestListItem purchaseRequest={purchaseRequestsFormatted.get(id)}/>
}