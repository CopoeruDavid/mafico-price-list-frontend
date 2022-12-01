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
  FileField,
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
import * as React from "react";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SavingsIcon from '@mui/icons-material/Savings';
import FileSaver from 'file-saver';
import { saveAs } from "file-saver";
import { PostEdit } from './FileUpload';
import { CreateStock } from './G7thCreate';
import { MarginChange } from './MarginUpdate';

const postFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];
const downloadPrice = () => {

  saveAs(
    "http://localhost:8000/stock/g7th/export",
    "G7th_Dealer.xlsx"
  );
  
}

const downloadSnel = () => {

  saveAs(
    "http://localhost:8000/stock/g7th/snelstart",
    "G7th_SnelStart.xlsx"
  );
  
}

const MyButton = () => {
  const record = useRecordContext();
  const handleClick = () => {
      console.log(record.id);
      // <MarginChange/>
      window.location.href='/#/margin-update-single/' + record.id;
  };
  return <Button
  type= "file"
  onClick={() => {handleClick() }}
  label="Margin"
>
  <SavingsIcon/>
</Button> 
}

const ListActions = () => (
  <TopToolbar>
      {/* <CreateButton/> */}
      {/* <ExportButton
      onClick={() => {alert("Yes");}}
      /> */}
      <Button
          type= "file"
          onClick={() => { window.location.href='/#/margin-update/'}}
          label="Margin"
      >
          <SavingsIcon/>
      </Button>
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
      <Button
          type= "file"
          onClick={() => {window.location.href='/#/add-stock-csv-g7th'}}
          label="Supplier Upload"
      >
          <CloudUploadIcon/>
      </Button>
      <Button
          type= "file"
          onClick={() => {window.location.href='/#/add-stock-g7th '}}
          label="Add new item"
      >
          <AddBusinessIcon/>
      </Button>
  </TopToolbar>
);

export const G7thList = () => (
  <List actions={<ListActions/>} filters={postFilters}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="article_number" />
      <TextField source="supplier_code" />
      <TextField source="brand" />
      <TextField source="product_description" />
      <TextField source="type" />
      <TextField source="model" />
      <TextField source="finish" />
      <TextField source="carton_qty" />
      <TextField source="unit_cost" />
      <TextField source="quantity" />
      <TextField source="value" />
      <TextField source="cbm" />
      <TextField source="vw" />
      <TextField source="gw" />
      <TextField source="barcode" label="EAN code" />
      <TextField source="carton_dimensions_cm" />
      <NumberField source="suggested_price" />
      <NumberField source="excl_btw" />
      <NumberField source="dealer_2" /> 
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

export const G7thEdit = () => (
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

