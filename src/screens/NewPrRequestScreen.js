import React, { useState } from "react";
import "./newprrequest.css";
const initialState = {
  prNumber: "",
  fiscalYear: "",
  date: "",
  requester: "",
  quantity: 0,
  rate: "",
  particular: "",
  serialNumber: "",
  department: "",
};

function NewPrRequestScreen() {
  const [formValues, setFormValue] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormValue({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`New Purchase Request Created`);

    var body = {
      values: [
        [
          formValues.fiscalYear,
          formValues.prNumber,
          formValues.date,
          formValues.requester,
          formValues.department,
          formValues.serialNumber,
          formValues.particular,
          formValues.quantity,
          formValues.rate,
          formValues.rate * formValues.quantity,
        ],
      ],
    };

    window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: "1Cboc6tEgwCCEuPRDHAPwqTc9SWjVYSkhae0hT_C4Cqo",
        range: "purchase-request!A2:K",
        valueInputOption: "USER_ENTERED",
        resource: body,
      })
      .then((response) => {
        alert(`New PR created`);

        setFormValue({ ...initialState });
        setLoading(false);
      });
  };

  return (
    <form
      className="form-box"
      // style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label>PR Number:</label>
      <input
        type="number"
        min="1"
        step="any"
        value={formValues.prNumber}
        name="prNumber"
        onChange={(e) => handleChange(e)}
      />

      <label>Fiscal Year:</label>
      <input
        type="text"
        value={formValues.fiscalYear}
        name="fiscalYear"
        onChange={(e) => handleChange(e)}
      />

      <label>Date: </label>
      <input
        type="date"
        name="date"
        value={formValues.date}
        onChange={(e) => handleChange(e)}
      />

      <label>Requested By: </label>
      <input
        type="text"
        value={formValues.requester}
        name="requester"
        onChange={(e) => handleChange(e)}
      />

      <label>Department: </label>
      <input
        value={formValues.department}
        type="text"
        name="department"
        onChange={(e) => handleChange(e)}
      />

      <label>SN no.: </label>
      <input
        value={formValues.serialNumber}
        type="number"
        min="1"
        step="any"
        name="serialNumber"
        onChange={(e) => handleChange(e)}
      />

      <label>Particular: </label>
      <textarea
        value={formValues.particular}
        type="text"
        name="particular"
        onChange={(e) => handleChange(e)}
      />

      <label>Quantity: </label>
      <input
        value={formValues.quantity}
        type="number"
        min="1"
        step="any"
        name="quantity"
        onChange={(e) => handleChange(e)}
      />

      <label>Rate: </label>
      <input
        value={formValues.rate}
        type="number"
        name="rate"
        min="1"
        step="any"
        onChange={(e) => handleChange(e)}
      />
      <br />
      <br />
      <input type="submit" value="Submit" disabled={loading} />
    </form>
  );
}

export default NewPrRequestScreen;
