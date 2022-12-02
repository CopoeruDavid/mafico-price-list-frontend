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
    NumberInput
  } from 'react-admin';
  import { makeStyles } from '@material-ui/core/styles';
  import * as React from "react";
  import { saveAs } from "file-saver";
  import { useState } from "react";
  import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import AddBusinessIcon from '@mui/icons-material/AddBusiness';
  import LocalShippingIcon from '@mui/icons-material/LocalShipping';
  import SavingsIcon from '@mui/icons-material/Savings';
  import UpdateIcon from '@mui/icons-material/Update';
  import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
  // import Button from '@mui/material/Button';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogContentText from '@mui/material/DialogContentText';
  import DialogTitle from '@mui/material/DialogTitle';
  import Slide from '@mui/material/Slide';
  import { LinearProgress  } from '@material-ui/core';
  
  const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
  ];

  const useStyles = makeStyles({
    draft: { backgroundColor: '#74fd74' },
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
      setLoading(true)
      setOpen(false)
      setLoadingOn(true)
      fetch('http://localhost:8000/stock/general/checkProducts/', {
          method: 'get',
      })
      .then(() =>{
          setLoadingOn(false)
          setLoading(false)
          window.location.href = '/#/general/stock'
          window.location.reload(false)
      }
      );
    }

    if(loading){
      return(
      <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
           <DialogTitle><img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png" width="30" height="30" style={{marginBottom: -5}}></img>{" You will be redirected when the job is finished "}</DialogTitle>
          <DialogContent>
            <LinearProgress  sx={{  width: '100%', color: 'orange' }}/>
          </DialogContent>
        </Dialog>
      )
    }
  
    return (
      <div>
        <Button
            type= "file"
            onClick={() => {handleClickOpen() }}
            label="Check if missing products"
            title="This will take a while, so sit back"
            // onMouseOver={}
        >
            <UpdateIcon/>
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png" width="30" height="30" style={{marginBottom: -5}}></img>{" Time warning "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You will now check if there are missing products from Snelstart. All the missing products will be shown in red. This will take a couple of minutes. Take a break, you have earned it ☕ 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

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
      setLoading(true)
      setOpen(false)
      setLoadingOn(true)
      fetch('http://localhost:8000/stock/general/checkEOL/', {
          method: 'get',
      })
      .then(() =>{
          setLoadingOn(false)
          setLoading(false)
          window.location.href = '/#/general/stock'
          window.location.reload(false)
      }
      );
    }

    if(loading){
      return(
      <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
           <DialogTitle><img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png" width="30" height="30" style={{marginBottom: -5}}></img>{" You will be redirected when the job is finished "}</DialogTitle>
          <DialogContent>
            <LinearProgress  sx={{  width: '100%', color: 'orange' }}/>
          </DialogContent>
        </Dialog>
      )
    }
  
    return (
      <div>
        <Button
            type= "file"
            onClick={() => {handleClickOpen() }}
            label="EOL Check"
            title="This will take a while, so sit back"
            // onMouseOver={}
        >
            <UpdateIcon/>
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
              You will now check if there are any EOL products that need adjustment. All the EOL products will be shown in red. This will take a couple of minutes. Take a break, you have earned it ☕ 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

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
      setLoading(true)
      setOpen(false)
      setLoadingOn(true)
      fetch('http://localhost:8000/stock/general/syncSnel/', {
          method: 'get',
      })
      .then(() =>{
          setLoadingOn(false)
          setLoading(false)
          window.location.href = '/#/general/stock'
          window.location.reload(false)
      }
      );
    }

    if(loading){
      return(
      <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/hourglass-not-done_23f3.png" width="30" height="30" style={{marginBottom: -5}}></img>{" You will be redirected when the job is finished "}</DialogTitle>
          <DialogContent>
            <LinearProgress  sx={{  width: '100%', color: 'orange' }}/>
          </DialogContent>
        </Dialog>
      )
    }
  
    return (
      <div>
        <Button
            type= "file"
            onClick={() => {handleClickOpen() }}
            label="Autofill via SS"
            title="This will take a while, so sit back"
            // onMouseOver={}
        >
            <UpdateIcon/>
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
             We will try to autofill the article number and supplier code based on your changes in SnelStart. This will take a couple of minutes. Take a break, you have earned it ☕ 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const ArticleNoField = (props) => {
    const record = useRecordContext();
    console.log(record[props.source].length);
    if (record[props.source] == "Add in SnelStart" || String(record[props.source]).includes("*EOL*")){
        return (
            <TextField
                sx={{ color:'red', fontWeight: "bold"}}
                {...props}
            />
        );
    }
    else{
        return (
            <TextField
                {...props}
            />
        );
    }
  };

  

  const ProductStatus = (props) => {
    const record = useRecordContext();
    console.log(record[props.source].length);
    if (String(record[props.source]).includes("*EOL*")){
        return (
            <TextField
                sx={{ color:'red', fontWeight: "bold"}}
                {...props}
            />
        );
    }
    else{
        return (
            <TextField
                {...props}
            />
        );
    }
  };

  const downloadPrice = () => {
  
    saveAs(
      "http://localhost:8000/stock/general/export",
      "Price_Dealer.xlsx"
    );
    
  }
  
  const downloadSnel = () => {
  
    saveAs(
      "http://localhost:8000/stock/general/snelstart",
      "SnelStart.xlsx"
    );
    
  }
  
//   const MyButton = () => {
//     const record = useRecordContext();
//     const handleClick = () => {
//         console.log(record.id);
//         // <MarginChange/>
//         window.location.href='/#/margin-update-single/' + record.id;
//     };
//     return <Button
//     type= "file"
//     onClick={() => {handleClick() }}
//     label="Margin"
//   >
//     <SavingsIcon/>
//   </Button> 
//   }
  
  const ListActions = () => (
    <TopToolbar>
        <Button
            type= "file"
            onClick={() => { window.location.href='/#/margin-update/'}}
            label="Modify margins"
            
        >
            <SavingsIcon/>
        </Button>
        <Button
            type= "file"
            onClick={() => {window.location.href='/#/add-stock-csv'}}
            label="Upload CSV with products"
        >
            <CloudUploadIcon/>
        </Button>
        <Button
            type= "file"
            onClick={() => {window.location.href='/#/add-stock'}}
            label="Add new item"
        >
            <AddBusinessIcon/>
        </Button>
        <MissingProducts/>
        <CheckEOL/>
        <SyncSnelstart/>
        <Button
          type= "file"
          onClick={() => { downloadPrice()}}
          label="Dealer Price List Export"
        >
          <ShoppingCartCheckoutOutlinedIcon/>
        </Button>
        <Button
          type= "file"
          onClick={() => { downloadSnel()}}
          label="SnelStart Export"
        >
            <LocalShippingIcon/>
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

    const postDefaultValue = () => ({costs: 1.05, margin: 0.75, dealer_margin: 0.8 });

    // const handleSubmit = (event) => {
    // event.preventDefault();
    // alert(`Your entered data: ${id}, ${article_number}, ${supplier_code}, ${brand}, ${product_description}`);
    // }
  
    const postSave = (data) => {
      console.log(data)
      let payload = new FormData()
      for(let prop in data){
        payload.append(String(prop), data[prop])
        // console.log(data[prop])
      }
      fetch('http://localhost:8000/stock/general/stock/', {
          method: 'post',
          body: payload
      })
      .then(() =>{
          window.location.href = '/#/general/stock'
          window.location.reload(false)
      }
      );
    };

    return (
    
      <SimpleForm onSubmit={postSave} defaultValues={postDefaultValue}>
        {/* <NumberInput source="id" validate={required()} value={id} onChange={(e) => setId(e.target.value)}/> */}
        <TextInput source="article_number" validate={required()} value={article_number} onChange={(e) => setArticle_number(e.target.value)}/>
        <TextInput source="model" validate={required()} value={model} onChange={(e) => setModel(e.target.value)}/>
        <TextInput source="brand" validate={required()} value={brand} onChange={(e) => setBrand(e.target.value)}/>
        <TextInput source="product_description" validate={required()} value={product_description} onChange={(e) => setProduct_description(e.target.value)}/>
        <TextInput source="product_description_long" validate={required()} value={product_description_long} onChange={(e) => setProduct_description_long(e.target.value)}/>
        <TextInput source="buying_price" validate={required()} value={buying_price} onChange={(e) => setBuying_price(e.target.value)}/>
        <TextInput source="ean_Code" validate={required()} value={ean_code} onChange={(e) => setEan_code(e.target.value)}/>
        <NumberInput source="costs" lable="Costs"  value={costs} onChange={(e) => setCosts(e.target.value)}/>
        <NumberInput source="margin" label = "Your margin"  value={margin} onChange={(e) => setMargin(e.target.value)}/>
        <NumberInput source="dealer_margin" label="Dealer Price Margin"  value={dealer_margin} onChange={(e) => setDealer_margin(e.target.value)}/>
        {/* <SaveButton label = "Add new stock" onClick={handleSubmit}/> */}
      </SimpleForm>
      

    );
  }
  
  export const GeneralList = () => {
    // let data = fetch('http://127.0.0.1:8000/stock/general/check').then((response) => response.json())
    // .then((data) => console.log(data));
    // console.log(data)
    return(
      <List actions={<ListActions/>} filters={postFilters}>
        <Datagrid>
          {/* <NumberField source="id" /> */}
          <ArticleNoField source="article_number" />
          <TextField source="model" />
          <TextField source="brand" />
          <ProductStatus source="product_description" />
          <TextField source="product_description_long" />
          <NumberField source="buying_price" options={{ style: 'currency', currency: 'EUR' }} label="Buying Price" />
          <TextField source="ean_code" label="EAN code" />
          <NumberField source="street_price" sx={{ fontWeight: "bold"}} label="MSRP" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/>
          <NumberField source="excl_btw" label="Excl VAT" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/>
          <NumberField source="dealer" label="Dealer Margin" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/> 
          <NumberField source="dealer_final" sx={{ fontWeight: "bold"}} options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/>
          <NumberField source="profit_margin" sx={{ fontWeight: "italic"}} options={{ style: 'percent',  maximumFractionDigits: 2}} textAlign="left"/>
          <EditButton />
          {/* <Button
              // type= "file"
              onClick={() => { }}
              label="Margin"
          >
              <SavingsIcon/>
          </Button> */}
          {/* <MyButton/> */}
        </Datagrid>
      </List>
    );
    }
  
  export const GeneralEdit = () => (
    <Edit>
      <SimpleForm>
        {/* <Datagrid rowClick="Edit"> */}
          {/* <NumberInput source="id" /> */}
          <TextInput source="article_number" />
          <TextInput source="model" />
          <TextInput source="brand" />
          <TextInput source="product_description" />
          <TextInput source="product_description_long" />
          <NumberInput source="buying_price" />
          <TextInput source="ean_code" />
          <NumberInput source="costs" />
          <TextInput source="currency" />
          <NumberInput source="margin" />
          <NumberInput source="dealer_margin" />
          <NumberInput source="street_price" />  
          {/* <SaveButton /> */}
        {/* </Datagrid> */}
      </SimpleForm>
    </Edit>
  
  );
  
  