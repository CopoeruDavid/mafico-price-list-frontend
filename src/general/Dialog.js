import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { useState } from "react";
import {
    List,
    Datagrid,
    BooleanField,
    EmailField,
    EditButton,
    NumberField,
    TopToolbar,
    ReferenceManyField,
    FilterButton,
    CreateButton,
    ExportButton,
    Edit,
    SimpleForm,
    Button,
    TextInput,
    SaveButton,
    useRecordContext,
    required,
    NumberInput,
  } from "react-admin";
import TextField from '@mui/material/TextField';
import Slide from "@mui/material/Slide";
import { saveAs } from "file-saver";
import { LinearProgress } from "@material-ui/core";
import UpdateIcon from "@mui/icons-material/Update";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const GenerateWebsiteFeed = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingOn, setLoadingOn] = React.useState(false);
  
    const styles = theme => ({
        textField: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',            
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500
        },
        
    });
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [ email, setEmail ] = React.useState(0);
  
    const handleAgree = () => {
      setLoading(true);
      setOpen(false);
      setLoadingOn(true);
      fetch('http://192.168.1.63:8000/stock/general/generateWebProducts/' + email)
        .then(response => response.json())
            .then(data => console.log(data));
    //   saveAs("http://192.168.1.63:8000/stock/general/generateWebProducts");
      setLoadingOn(false);
      setLoading(false);
      window.location.href = "/pricelist-frontend/stock";
      window.location.reload(false);
    
    };
  
    if (loading) {
      return (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <img
              src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
              width="30"
              height="30"
              style={{ marginBottom: -5 }}
            ></img>
            {" You will be redirected when the job is finished "}
          </DialogTitle>
          <DialogContent>
            <LinearProgress sx={{ width: "100%", color: "orange" }} />
          </DialogContent>
        </Dialog>
      );
    }
  
    return (
      <div>
        <Button
          type="file"
          onClick={() => {
            handleClickOpen();
          }}
          label="Generate New Website Feed"
          title="This will take a while, so sit back"
          // onMouseOver={}
        >
          <UpdateIcon />
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"⌛ Time warning ⌛"}</DialogTitle>
          {/* <TextInput id="outlined-basic" label="Enter your email address so we can send the new export" variant="outlined" /> */}
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          <DialogContent>
          <TextField id="outlined-basic" label="Enter your email so we can send you the new import file" variant="outlined" defaultValue="@mafico.com"  onChange={(v) => setEmail(v.target.value) } sx={{width: '60%', marginBottom: '2%'}} />
            <DialogContentText id="alert-dialog-slide-description">
              We will generate a new list of products for the website and send it to your email. You can also retrieve the latest one by clicking on "Website Feed". Generating a new one will take around 10 minutes so bear with us. Thank you ☕
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
          
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };