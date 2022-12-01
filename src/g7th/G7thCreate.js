import * as React from "react";
import { useState } from "react";
import { Create, SimpleForm, DateInput, required, NumberInput, SaveButton } from 'react-admin';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EmailField,
    EditButton,
    TopToolbar,
    FileInput,
    FileField,
    FilterButton,
    CreateButton,
    ExportButton,
    Button,
    TextInput
  } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';

// export const CreateStock = () => (
//     <Create component="div">
//         <SimpleForm>
//             <TextInput source="title" validate={[required()]} fullWidth />
            
//         </SimpleForm>
//     </Create>
// );

export const CreateStock = () => {

    const [id, setId] = useState("");
    const [article_number, setArticle_number] = useState("");
    const [supplier_code, setSupplier_code] = useState("");
    const [brand, setBrand] = useState("");
    const [product_description, setProduct_description] = useState("");
    const [unit_cost, setUnit_cost] = useState("");
    const [barcode, setBarcode] = useState("");
    const [costs, setCosts] = useState("");
    const [margin, setMargin] = useState("");
    const [dealer_multiplier, setDealer_multiplier] = useState("");

    const postDefaultValue = () => ({costs: 1.05, margin: 0.75, dealer_multiplier: 2 });

    const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your entered data: ${id}, ${article_number}, ${supplier_code}, ${brand}, ${product_description}`);
    }
  
    const postSave = (data) => {
      console.log(data)
      let payload = new FormData()
      for(let prop in data){
        payload.append(String(prop), data[prop])
        // console.log(data[prop])
      }
      fetch('http://localhost:8000/stock/g7th/stock/', {
          method: 'post',
          body: payload
      })
      .then(() =>{
          window.location.href = '/#/g7th/stock'
          window.location.reload(false)
      }
      );
    };

    return (
    
      <SimpleForm onSubmit={postSave} defaultValues={postDefaultValue}>
        {/* <NumberInput source="id" validate={required()} value={id} onChange={(e) => setId(e.target.value)}/> */}
        <TextInput source="article_number" validate={required()} value={article_number} onChange={(e) => setArticle_number(e.target.value)}/>
        <TextInput source="supplier_code" validate={required()} value={supplier_code} onChange={(e) => setSupplier_code(e.target.value)}/>
        <TextInput source="brand" validate={required()} value={brand} onChange={(e) => setBrand(e.target.value)}/>
        <TextInput source="product_description" validate={required()} value={product_description} onChange={(e) => setProduct_description(e.target.value)}/>
        <TextInput source="type" />
        <TextInput source="model" />
        <TextInput source="finish" />
        <TextInput source="carton_qty" />
        <TextInput source="unit_cost" validate={required()} value={unit_cost} onChange={(e) => setUnit_cost(e.target.value)}/>
        <TextInput source="quantity" />
        <TextInput source="value" />
        <TextInput source="cbm" />
        <TextInput source="vw" />
        <TextInput source="gw" />
        <TextInput source="barcode" validate={required()} value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
        <TextInput source="carton_dimensions_cm" />
        <NumberInput source="costs" lable="Costs"  value={costs} onChange={(e) => setCosts(e.target.value)}/>
        <NumberInput source="margin" label = "Your margin"  value={margin} onChange={(e) => setMargin(e.target.value)}/>
        <NumberInput source="dealer_multiplier" label="Dealer Price Multiplier"  value={dealer_multiplier} onChange={(e) => setDealer_multiplier(e.target.value)}/>
        {/* <SaveButton label = "Add new stock" onClick={handleSubmit}/> */}
      </SimpleForm>
      

    );
}