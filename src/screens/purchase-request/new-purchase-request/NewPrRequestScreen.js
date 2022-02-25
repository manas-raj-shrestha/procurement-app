import React, { useState } from "react";
import "./style.css";
import { Button, Paper, TextField , Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

const initialItems = {
  quantity: 0,
  rate: "",
  particular: "",
  serialNumber: 1,
};

const initialState = {
  prNumber: "",
  fiscalYear: "",
  date: "",
  requester: "",
  department: "",
  items: [{ ...initialItems }],
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewPrRequestScreen() {
  const [formValues, setFormValue] = useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormValue({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleChangeForItems = (event, element, index) => {
    formValues.items.at(index)[event.target.name] = event.target.value;
    setFormValue({ ...formValues });
  };

  const buildItemRows = (element, index) => {
  
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          style={{ flex: 1, margin: 8 }}
          disabled={true}
          name="serialNumber"
          label="Serial Number"
          type="number"
          value={element.serialNumber}
          onChange={(e) => handleChangeForItems(e, element, index)}
        />

        <TextField
          style={{ flex: 1, margin: 8 }}
          name="particular"
          label="Particular"
          type="text"
          value={element.particular}
          onChange={(e) => handleChangeForItems(e, element, index)}
        />

        <TextField
          style={{ flex: 1, margin: 8 }}
          name="quantity"
          label="Quantity"
          type="number"
          value={element.quantity}
          onChange={(e) => handleChangeForItems(e, element, index)}
        />
        <TextField
          style={{ flex: 1, margin: 8 }}
          name="rate"
          label="Rate"
          type="number"
          value={element.rate}
          onChange={(e) => handleChangeForItems(e, element, index)}
        />
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`New Purchase Request Created`);

    var newValues = formValues.items.map((element) => {
      return [
        formValues.fiscalYear,
        formValues.prNumber,
        formValues.date,
        formValues.requester,
        formValues.department,
        element.serialNumber,
        element.particular,
        element.quantity,
        element.rate,
        element.rate * element.quantity,
      ];
    });

    console.log(newValues);

    var body = {
      values: newValues,
    };

    window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: "1Cboc6tEgwCCEuPRDHAPwqTc9SWjVYSkhae0hT_C4Cqo",
        range: "purchase-request!A2:K",
        valueInputOption: "USER_ENTERED",
        resource: body,
      })
      .then((response) => {
        // alert(`New P(R created`);
        handleClickOpen();

        setFormValue({ ...initialState });
        setLoading(false);
      });
  };

  return (
  <div> <Paper style={{
     margin: 16,
   alignItems:'center'
    
    }}>
      <form
     
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
        onSubmit={handleSubmit}
      >
           <div style={{margin: 16, fontSize: 24}}>New Purchase Request</div>
        <div style={{ justifyContent: "space-around", display: "flex" }}>
          <TextField
            style={{ marginTop: 16, flex: 2, margin: 8 }}
            name="prNumber"
            label="PR Number"
            type="number"
            value={formValues.prNumber}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            style={{ flex: 2, margin: 8 }}
            name="fiscalYear"
            label="Fiscal Year"
            type="text"
            value={formValues.fiscalYear}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            style={{ flex: 1, margin: 8 }}
            name="date"
            label="Date"
            type="text"
            value={formValues.fiscalYear}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div style={{ justifyContent: "space-around", display: "flex" }}>
          <TextField
            style={{ flex: 1, margin: 8 }}
            name="requester"
            label="Requested By"
            type="text"
            value={formValues.requester}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            style={{ flex: 1, margin: 8 }}
            name="department"
            label="Department"
            type="text"
            value={formValues.department}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div style={{margin: 16, fontSize: 24}}>Items</div>

        {formValues.items.map((element, index) => {
          return buildItemRows(element, index);
        })}
        <div style={{display:'flex', justifyContent:'end', marginTop: 16}}>
          <Button
          style={{marginRight: 16}}
            variant="outlined"
            onClick={() => {
              formValues.items.push({
                ...initialItems,
                serialNumber: formValues.items.length + 1,
              });
              
              setFormValue({ ...formValues });
            }}
          >
            Add Item
          </Button>

          <Button disabled={loading} type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Paper>

    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Purchase Request Created!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Check your google sheet to find the newly created purchase request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

export default NewPrRequestScreen;
