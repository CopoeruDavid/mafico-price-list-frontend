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
    NumberInput
  } from 'react-admin';
  import { makeStyles } from '@material-ui/core/styles';
  import classnames from 'classnames';
  import * as React from "react";
  import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import AddBusinessIcon from '@mui/icons-material/AddBusiness';
  import LocalShippingIcon from '@mui/icons-material/LocalShipping';
  import SavingsIcon from '@mui/icons-material/Savings';
  import FileSaver from 'file-saver';
  import { saveAs } from "file-saver";
  
  const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
  ];

  const useStyles = makeStyles({
    draft: { backgroundColor: '#74fd74' },
  });

  const ColoredTextField = props => {
    const classes = useStyles();
  
    const isDraft = carry => carry;
  
    return (
      <TextField
        className={classnames({
          [classes.draft]: props.record[props.source],
        })}
        {...props} 
      />
    );
  };

  const ColoredNumberField = (props) => {
    const record = useRecordContext();
    return (
        <NumberField
            sx={{ color: record[props.source] > 50 ? 'blue' : 'black' }}
            {...props}
        />
    );
  };

  const ArticleNoField = (props) => {
    const record = useRecordContext();
    console.log(record[props.source]);
    return (
        <TextField
            sx={{ color: record[props.source] = ' ' ? 'red' : record[props.source]}}
            {...props}
        />
    );
  };

//   const downloadPrice = () => {
  
//     saveAs(
//       "http://localhost:8000/stock/g7th/export",
//       "G7th_Dealer.xlsx"
//     );
    
//   }
  
//   const downloadSnel = () => {
  
//     saveAs(
//       "http://localhost:8000/stock/g7th/snelstart",
//       "G7th_SnelStart.xlsx"
//     );
    
//   }
  
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
  
//   const ListActions = () => (
//     <TopToolbar>
//         {/* <CreateButton/> */}
//         {/* <ExportButton
//         onClick={() => {alert("Yes");}}
//         /> */}
//         <Button
//             type= "file"
//             onClick={() => { window.location.href='/#/margin-update/'}}
//             label="Margin"
//         >
//             <SavingsIcon/>
//         </Button>
//         <Button
//             type= "file"
//             onClick={() => { downloadPrice()}}
//             label="Dealer Price List Export"
//         >
//             <ShoppingCartCheckoutOutlinedIcon/>
//         </Button>
//         <Button
//             type= "file"
//             onClick={() => { downloadSnel()}}
//             label="SnelStart Export"
//         >
//             <LocalShippingIcon/>
//         </Button>
//         <Button
//             type= "file"
//             onClick={() => {window.location.href='/#/add-stock-csv-g7th'}}
//             label="Supplier Upload"
//         >
//             <CloudUploadIcon/>
//         </Button>
//         <Button
//             type= "file"
//             onClick={() => {window.location.href='/#/add-stock-g7th '}}
//             label="Add new item"
//         >
//             <AddBusinessIcon/>
//         </Button>
//     </TopToolbar>
//   );
  
  export const OrcaList = () => (
    <List>
      <Datagrid>
        <NumberField source="id" />
        <ArticleNoField source="article_number" />
        <TextField source="model" />
        <TextField source="brand" />
        <TextField source="product_description" />
        <TextField source="product_description_long" />
        <NumberField source="parcel_height" options={{ style: 'unit', unit: 'centimeter' }} />
        <NumberField source="parcel_width" options={{ style: 'unit', unit: 'centimeter' }} />
        <NumberField source="parcel_length" options={{ style: 'unit', unit: 'centimeter' }} />
        <NumberField source="net_cost" options={{ style: 'currency', currency: 'EUR' }} label="NET List Price" />
        <TextField source="comodity_code" />
        <BooleanField source="carry_on" />
        <TextField source="barcode" label="EAN code" />
        <NumberField source="suggested_price" label="Street" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/>
        <NumberField source="excl_btw" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/>
        <ColoredNumberField source="dealer_price" options={{ style: 'currency', currency: 'EUR' }} textAlign="left"/> 
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
  
  export const OrcaEdit = () => (
    <Edit>
      <SimpleForm>
        {/* <Datagrid rowClick="Edit"> */}
          {/* <NumberInput source="id" /> */}
          <TextInput source="article_number" />
          <TextInput source="supplier_code" />
          <TextInput source="brand" />
          <TextInput source="product_description" />
          <TextInput source="type" />
          <TextInput source="model" />
          <TextInput source="finish" />
          <TextInput source="carton_qty" />
          <TextInput source="unit_cost" />
          <TextInput source="quantity" />
          <TextInput source="value" />
          <TextInput source="cbm" />
          <TextInput source="vw" />
          <TextInput source="gw" />
          <TextInput source="barcode" />
          <TextInput source="carton_dimensions_cm" />
          <NumberInput source="costs" />
          <NumberInput source="margin" />
          <NumberInput source="dealer_multiplier" />
          <NumberInput source="suggested_price" />  
          {/* <SaveButton /> */}
        {/* </Datagrid> */}
      </SimpleForm>
    </Edit>
  
  );
  
  