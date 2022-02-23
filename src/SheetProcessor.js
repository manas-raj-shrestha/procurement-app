let vendors = [];
let purchaseRequestsFormatted = new Map();
let purchaseOrdersFormatted = new Map();
let goodsReceived = new Map();

function parsePurchaseRequestsFromSheets(values) {
  purchaseRequestsFormatted.clear();
  values.forEach((element) => {
    var constructedElement = {
      fiscalYear: element[0],
      prNo: element[1],
      date: element[2],
      requestedBy: element[3],
      department: element[4],
      serialNo: element[5],
      particular: element[6],
      quantity: element[7],
      rate: element[8],
      total: element[9].replace(/\,/g, ""),
    };

    if (!purchaseRequestsFormatted.has(constructedElement.prNo)) {
      constructedElement.items = [
        {
          serialNo: constructedElement.serialNo,
          particular: constructedElement.particular,
          quantity: constructedElement.quantity,
          rate: constructedElement.rate,
          total: constructedElement.total,
        },
      ];
      purchaseRequestsFormatted.set(
        constructedElement.prNo,
        constructedElement
      );
    } else {
      let existingElement = purchaseRequestsFormatted.get(
        constructedElement.prNo
      );
      existingElement.items.push({
        serialNo: constructedElement.serialNo,
        particular: constructedElement.particular,
        quantity: constructedElement.quantity,
        rate: constructedElement.rate,
        total: constructedElement.total,
      });
      purchaseRequestsFormatted.set(constructedElement.prNo, existingElement);
    }
  });
   
  return purchaseRequestsFormatted;
}

function parsePurchaseOrderFromSheets(values) {
  purchaseOrdersFormatted.clear();

  values.forEach((element) => {
    var constructedElement = {
      fiscalYear: element[0],
      poNumber: element[1],
      prNo: element[2],
      date: element[3],
      vendor: element[4],
      department: element[5],
      serialNo: element[6],
      particular: element[7],
      quantity: element[8],
      rate: element[9],
      total: element[10].replace(/\,/g, ""),
      vatTotal: element[11].replace(/\,/g, ""),
      grandTotal: element[12].replace(/\,/g, ""),
    };

    if (!purchaseOrdersFormatted.has(constructedElement.poNumber)) {
      constructedElement.items = [
        {
          serialNo: constructedElement.serialNo,
          particular: constructedElement.particular,
          quantity: constructedElement.quantity,
          rate: constructedElement.rate,
          total: constructedElement.total,
          vatTotal: constructedElement.vatTotal,
          grandTotal: constructedElement.grandTotal,
        },
      ];
      purchaseOrdersFormatted.set(
        constructedElement.poNumber,
        constructedElement
      );
    } else {
      let existingElement = purchaseOrdersFormatted.get(
        constructedElement.poNumber
      );
      existingElement.items.push({
        serialNo: constructedElement.serialNo,
        particular: constructedElement.particular,
        quantity: constructedElement.quantity,
        rate: constructedElement.rate,
        total: constructedElement.total,
        vatTotal: constructedElement.vatTotal,
        grandTotal: constructedElement.grandTotal,
      });
      purchaseOrdersFormatted.set(constructedElement.poNumber, existingElement);
    }
  });


  return purchaseOrdersFormatted;
}

function parseGoodsReceivedFromSheets(values) {
  goodsReceived.clear();

  values.forEach((element) => {
    var constructedElement = {
      fiscalYear: element[0],
      grNumber: element[1],
      prNo: element[2],
      poNumber: element[3],
      invoiceNumber: element[4],
      date: element[5],
      vendor: element[6],
      department: element[7],
      serialNo: element[8],
      particular: element[9],
      quantity: element[10],
      deliveredQuantity: element[11],
      unit: element[12],
      vatAddedUnitPrice: element[13].replace(/\,/g, ""),
      remarks: element[14],
    };

    if (!goodsReceived.has(constructedElement.grNumber)) {
      constructedElement.items = [
        {
          serialNo: constructedElement.serialNo,
          particular: constructedElement.particular,
          quantity: constructedElement.quantity,
          unit: constructedElement.unit,
          vatAddedUnitPrice: constructedElement.vatAddedUnitPrice,
          remarks: constructedElement.remarks,
          deliveredQuantity: constructedElement.deliveredQuantity,
        },
      ];
      goodsReceived.set(constructedElement.grNumber, constructedElement);
    } else {
      let existingElement = goodsReceived.get(constructedElement.grNumber);
      existingElement.items.push({
        serialNo: constructedElement.serialNo,
        particular: constructedElement.particular,
        quantity: constructedElement.quantity,
        unit: constructedElement.unit,
        vatAddedUnitPrice: constructedElement.vatAddedUnitPrice,
        remarks: constructedElement.remarks,
        deliveredQuantity: constructedElement.deliveredQuantity,
      });
      goodsReceived.set(constructedElement.grNumber, existingElement);
    }
  });

  return goodsReceived;
}

function parseVendors(workbook) {
  //   var vendorSheet = workbook.SheetNames.find(function (element) {
  //     return element == "vendors";
  //   });
  //   const worksheet = workbook.Sheets[vendorSheet];
  //   const vendors = utils.sheet_to_json(worksheet);
  //   vendors.forEach((vendor) => vendors.push(vendor["Vendors"]));
}

export {
  purchaseOrdersFormatted,
  goodsReceived,
  purchaseRequestsFormatted,
  parseGoodsReceivedFromSheets,
  parsePurchaseRequestsFromSheets,
  parsePurchaseOrderFromSheets,
};
