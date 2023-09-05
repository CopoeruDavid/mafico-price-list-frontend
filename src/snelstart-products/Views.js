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

const MissingProducts = () => {
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
        label="Check if new products"
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

// const GenerateWebsiteFeed = () => {
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [loadingOn, setLoadingOn] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleAgree = () => {
//     setLoading(true);
//     setOpen(false);
//     setLoadingOn(true);
//     saveAs("http://192.168.1.63:8000/stock/general/generateWebProducts");
//     setLoadingOn(false);
//     setLoading(false);
//     window.location.href = "/#/general/stock";
//     window.location.reload(false);
  
//   };

//   if (loading) {
//     return (
//       <Dialog
//         open={true}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>
//           <img
//             src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png"
//             width="30"
//             height="30"
//             style={{ marginBottom: -5 }}
//           ></img>
//           {" You will be redirected when the job is finished "}
//         </DialogTitle>
//         <DialogContent>
//           <LinearProgress sx={{ width: "100%", color: "orange" }} />
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   return (
//     <div>
//       <Button
//         type="file"
//         onClick={() => {
//           handleClickOpen();
//         }}
//         label="Generate Website Feed"
//         title="This will take a while, so sit back"
//         // onMouseOver={}
//       >
//         <UpdateIcon />
//       </Button>
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>{"⌛ Time warning ⌛"}</DialogTitle>
//         {/* <TextInput id="outlined-basic" label="Enter your email address so we can send the new export" variant="outlined" /> */}
//         <TextFieldDialog id="outlined-basic" label="Outlined" variant="outlined" />
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             We will generate a new list of products for the website. You can also retrieve the latest one by clicking on "Website Feed". Generating a new one will take 10 minutes so bear with us. A new tab will be opened, please do not close it before the file has been downloaded on your computer. Thank you ☕
//           </DialogContentText>
//         </DialogContent>
        
//         <DialogActions>
        
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleAgree}>Agree</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

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
    <MissingProducts />
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

export const CreateStock = () => {
  const [id, setId] = useState("");
  const [article_number, setArticle_number] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_description_long, setProduct_description_long] = useState("");
  const [buying_price, setBuying_price] = useState("");
  const [ean_code, setEan_code] = useState("");
  const [costs, setCosts] = useState("");
  const [margin, setMargin] = useState("");
  const [dealer_margin, setDealer_margin] = useState("");

  const postDefaultValue = () => ({
    costs: 1.05,
    margin: 0.75,
    dealer_margin: 0.8,
  });

  const postSave = (data) => {
    console.log(data);
    let payload = new FormData();
    for (let prop in data) {
      payload.append(String(prop), data[prop]);
    }
    fetch("http://192.168.1.63:8000/pricelist-backend/stock/", {
      method: "post",
      body: payload,
    }).then(() => {
      window.location.href = "/pricelist-frontend";
      window.location.reload(false);
    });
  };

  return (
    <SimpleForm onSubmit={postSave} defaultValues={postDefaultValue}>
      {/* <NumberInput source="id" validate={required()} value={id} onChange={(e) => setId(e.target.value)}/> */}
      <TextInput
        source="article_number"
        validate={required()}
        value={article_number}
        onChange={(e) => setArticle_number(e.target.value)}
      />
      <TextInput
        source="model"
        validate={required()}
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <TextInput
        source="brand"
        validate={required()}
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <TextInput
        source="product_description"
        validate={required()}
        value={product_description}
        onChange={(e) => setProduct_description(e.target.value)}
      />
      <TextInput
        source="product_description_long"
        validate={required()}
        value={product_description_long}
        onChange={(e) => setProduct_description_long(e.target.value)}
      />
      <TextInput
        source="buying_price"
        validate={required()}
        value={buying_price}
        onChange={(e) => setBuying_price(e.target.value)}
      />
      <TextInput
        source="ean_Code"
        validate={required()}
        value={ean_code}
        onChange={(e) => setEan_code(e.target.value)}
      />
      <NumberInput
        source="costs"
        lable="Costs"
        value={costs}
        onChange={(e) => setCosts(e.target.value)}
      />
      <NumberInput
        source="margin"
        label="Your margin"
        value={margin}
        onChange={(e) => setMargin(e.target.value)}
      />
      <NumberInput
        source="dealer_margin"
        label="Dealer Price Margin"
        value={dealer_margin}
        onChange={(e) => setDealer_margin(e.target.value)}
      />
      {/* <SaveButton label = "Add new stock" onClick={handleSubmit}/> */}
    </SimpleForm>
  );
};

export const SnelStartProductsList = () => {
  return (
    <List>
      <Datagrid>
        {/* <NumberField source="id" /> */}
        <ArticleNoField source="maficoCode" />
        <TextField source="model" label="Supplier code" />
        {/* <ProductStatus source="product_description" /> */}
        <ProductStatus source="description" />
        <TextField source="type" lable="Type"/>
        <NumberField
          source="maficoPrice"
          options={{ style: "currency", currency: "EUR" }}
          sx={{ fontWeight: "bold" }}
          textAlign="left"
          label="Selling Price"
        />
        <NumberField
          source="msrp"
          options={{ style: "currency", currency: "EUR" }}
          sx={{ fontWeight: "bold" }}
          textAlign="left"
          label="MSRP"
        />
        <TextField source="ean" label="EAN code" />
        <BooleanField source="isPublic" label="Public" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const SnelStartProductEdit = () => (
  <Edit>
    <ImageUpload />
    <SimpleForm>
      {/* <Datagrid rowClick="Edit"> */}
      {/* <NumberInput source="id" /> */}
      <TextInput source="maficoCode" />
      <TextInput source="model" />
      <TextInput source="description" />
      <TextInput source="type" lable="Type"/>
      <NumberInput source="maficoPrice" />
      <TextInput source="ean" />
      
      {/* <SaveButton /> */}
      {/* </Datagrid> */}
    </SimpleForm>
    
  </Edit>
  
);
