import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EmailField,
  EditButton,
  NumberField,
  TopToolbar,
  ReferenceManyField,
  FilterButton,
  CreateButton,
  Form,
  Edit,
  SimpleForm,
  Button,
  TextInput,
  SaveButton,
  useRecordContext,
  required,
  NumberInput,
  UrlField,
  ArrayField,
  DeleteButton,
  ArrayInput,
  SimpleFormIterator,
  ImageField,
  BooleanInput,
  DateField,
} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import {TextField as TextFieldDialog} from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { saveAs } from "file-saver";
import { useState } from "react";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SavingsIcon from "@mui/icons-material/Savings";
import UpdateIcon from "@mui/icons-material/Update";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { LinearProgress } from "@material-ui/core";
import { ImageUpload } from "./ImageUpload";
import  UrlInput  from './UrlInput';
// import { GenerateWebsiteFeed } from "./Dialog"
// import { FileUpload } from "./FileUpload";

const postFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const useStyles = makeStyles({
  draft: { backgroundColor: "#74fd74" },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductImageDelete = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingOn, setLoadingOn] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setLoading(true);
    setOpen(false);
    setLoadingOn(true);
    fetch("http://192.168.1.63:8000/pricelist-backend/checkProducts/", {
      method: "get",
    }).then(() => {
      setLoadingOn(false);
      setLoading(false);
      window.location.href = "/pricelist-frontend/stock";
      window.location.reload(false);
    });
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
          {/* <img
            src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
            width="30"
            height="30"
            style={{ marginBottom: -5 }}
          ></img> */}
          {" The image is being removed... "}
        </DialogTitle>
        <DialogContent>
          <LinearProgress sx={{ width: "100%", color: "orange" }} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      {/* <Button
        type="file"
        onClick={() => {
          handleClickOpen();
        }}
        label="Check if new products"
        title="This will take a while, so sit back"
        // onMouseOver={}
      >
        <UpdateIcon />
      </Button> */}
      <Dialog
        open={open}
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
          {" Time warning "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You will now check if there are missing products from Snelstart. All
            the missing products will be shown in red. This will take a couple
            of minutes. Take a break, you have earned it ☕
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



const CheckEOL = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingOn, setLoadingOn] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setLoading(true);
    setOpen(false);
    setLoadingOn(true);
    fetch("http://192.168.1.63:8000/pricelist-backend/checkEOL/", {
      method: "get",
    }).then(() => {
      setLoadingOn(false);
      setLoading(false);
      window.location.href = "/pricelist-frontend/stock";
      window.location.reload(false);
    });
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
          {/* <img
            src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
            width="30"
            height="30"
            style={{ marginBottom: -5 }}
          ></img> */}
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
        label="EOL Check"
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
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You will now check if there are any EOL products that need
            adjustment. All the EOL products will be shown in red. This will
            take a couple of minutes. Take a break, you have earned it ☕
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

const SyncSnelstart = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingOn, setLoadingOn] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setLoading(true);
    setOpen(false);
    setLoadingOn(true);
    fetch("http://192.168.1.63:8000/pricelist-backend/syncSnel/", {
      method: "get",
    }).then(() => {
      setLoadingOn(false);
      setLoading(false);
      window.location.href = "/pricelist-frontend/stock";
      window.location.reload(false);
    });
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
          {/* <img
            src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
            width="30"
            height="30"
            style={{ marginBottom: -5 }}
          ></img> */}
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
        label="Autofill via SS"
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
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We will try to autofill the article number and supplier code based
            on your changes in SnelStart. This will take a couple of minutes.
            Take a break, you have earned it ☕
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


const ArticleNoField = (props) => {
  const record = useRecordContext();
  console.log(record[props.source].length);
  if (
    record[props.source] == "Add in SnelStart" ||
    String(record[props.source]).includes("*EOL*")
  ) {
    return <TextField sx={{ color: "red", fontWeight: "bold" }} {...props} />;
  } else {
    return <TextField {...props} />;
  }
};

const ProductStatus = (props) => {
  const record = useRecordContext();
  console.log(record[props.source].length);
  if (String(record[props.source]).includes("*EOL*")) {
    return <TextField sx={{ color: "red", fontWeight: "bold" }} {...props} />;
  } else {
    return <TextField {...props} />;
  }
};

const downloadWebsiteFeed = () => {
  saveAs("http://192.168.1.63:8000/pricelist-backend/getWebProducts", "Webiste Products Feed.csv");
};

const downloadPrice = () => {
  saveAs("http://192.168.1.63:8000/pricelist-backend/export", "Price_Dealer.xlsx");
};

const downloadSnel = () => {
  saveAs("http://192.168.1.63:8000/pricelist-backend/snelstart", "SnelStart.xlsx");
};

const downloadSnelNewProducts = () => {
  saveAs("http://192.168.1.63:8000/pricelist-backend/snelStartNewProd", "SnelStartNewProducts.xlsx");
};

const downloadTemplateFile = () => {
  saveAs("http://192.168.1.63:8000/pricelist-backend/generateTemplate", "TemplateFile.xlsx");
};

const ListActions = () => (
  <TopToolbar>
    {/* <GenerateWebsiteFeed /> */}
    {/* <Button
      type="file"
      onClick={() => {
        downloadWebsiteFeed();
      }}
      label="Download Webiste Feed"
    >
     <ShoppingCartCheckoutOutlinedIcon />
    </Button>  */}
    <Button
      type="file"
      onClick={() => {
        downloadTemplateFile();
      }}
      label="Download Template File"
    >
     <ShoppingCartCheckoutOutlinedIcon />
    </Button> 
    <Button
      type="file"
      onClick={() => {
        window.location.href = "/pricelist-frontend/add-stock-csv";
      }}
      label="Upload file with products"
    >
      <CloudUploadIcon />
    </Button>
    <SyncSnelstart />
    {/* <MissingProducts /> */}
    <Button
      type="file"
      onClick={() => {
        downloadSnelNewProducts();
      }}
      label="New Products File"
    >
     <ShoppingCartCheckoutOutlinedIcon />
    </Button> 
    <CheckEOL />
    {/* <Button
      type="file"
      onClick={() => {
        window.location.href = "/pricelist-frontend/add-stock";
      }}
      label="Add new item"
    >
      <AddBusinessIcon />
    </Button> */}
    <Button
      type="file"
      onClick={() => {
        window.location.href = "/pricelist-frontend/margin-update/";
      }}
      label="Modify margins"
    >
      <SavingsIcon />
    </Button>
    <Button
      type="file"
      onClick={() => {
        downloadPrice();
      }}
      label="Dealer Price List Export"
    >
      <ShoppingCartCheckoutOutlinedIcon />
    </Button>
    <Button
      type="file"
      onClick={() => {
        downloadSnel();
      }}
      label="SnelStart Export"
    >
      <LocalShippingIcon />
    </Button>
  </TopToolbar>
);


export const WebsiteTrademarksList = () => {
  return (
    <List filters={postFilters}>
      <Datagrid>
        <TextField source="name" label="Trademark Name" />
        <UrlField source="website" lable="Website"/>
        {/* <TextField source="descriptionHTML" label="Website Description" /> */}
        <BooleanField source="isPublic" label="Public" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const SelectedImage = () => {
  // const { selectedIds, onToggleItem } = useListContext();
  const record = useRecordContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingOn, setLoadingOn] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setLoading(true);
    setOpen(false);
    setLoadingOn(true);
    const pattern = /id=([a-f0-9\-]+)/;
    const match = record.url.match(pattern);
    console.log(match[1])
    fetch("http://192.168.1.63:8000/website-products/delete-image/" + match[1] + "/", {
      method: "post",
    }).then(() => {
      setLoadingOn(false);
      setLoading(false);
      // window.location.href = "/pricelist-frontend/stock";
      window.location.reload(false);
    });
  };
  return (
    <div>
      <Button
        type="file"
        onClick={() => {
          console.log(record.url);
          handleClickOpen();
        }}
        label="Remove image"
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
        <DialogTitle>
          {/* <img
            src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
            width="30"
            height="30"
            style={{ marginBottom: -5 }}
          ></img> */}
          {" Just checking :) "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You will now delete the image {record.name} from the website.
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


const validateUrl = (value) => {
  // Regular expression for URL validation
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(value)) {
    return 'Invalid URL. Please enter a valid URL.';
  }
  return undefined;
};

export const WebsiteTrademarksEdit = () => {

  return (
  <Edit>
    <ImageUpload />
    <ArrayField source='files' bulkActionButtons={true}>
      <Datagrid>
        <TextField source="name" label="Image ID" />
        <UrlField source="url" label="Image URL" />
        <SelectedImage />
      </Datagrid>
    </ArrayField>
    <SimpleForm>
      <TextInput source="name" />
      <UrlInput label="Website" source="website"/>
      {/* <UrlField source="website" /> */}
      <TextInput source="description" />
      <BooleanInput source="isActive" label="Active"/>
      <BooleanInput source="isPublic" label="Public"/>
      {/* <DateField source="updatedAt" label="Last modification"/> */}
      <RichTextInput source="descriptionHTML" label="Website Description"/>

      
      {/* <SaveButton /> */}
      {/* </Datagrid> */}
    </SimpleForm>
    
  </Edit>
  
);}
