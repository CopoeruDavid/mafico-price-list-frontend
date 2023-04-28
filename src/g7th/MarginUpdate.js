import * as React from "react";
import { Edit, SaveButton, SimpleForm,Toolbar, useRecordContext ,TextInput, FormDataConsumer,DisabledInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, NumberField, NumberInput } from 'react-admin';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";
import { useState } from "react";
// import RichTextInput from 'ra-input-rich-text';

export const MarginChange = ({record,...props}) => {

    // const record = useRecordContext();
    // console.log(record);
    // const params = new URLSearchParams(window.location.pathname);
    // console.log(params.get("id"));
    const { id } = useParams();
    console.log(id)
    if (!record){
        record = {id:1}
    }
    record.id = id
    const [costs, setCosts] = useState("");
    const [margin, setMargin] = useState("");
    const [dealer_multiplier, setDealer_multiplier] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let payload = new FormData()
        payload.append('id', id)
        payload.append('costs', costs)
        payload.append('margin', margin)
        payload.append('dealer_multiplier', dealer_multiplier)
        fetch('http://localhost:8000/stock/g7th/margin-update/' + String(id), {
            method: 'post',
            body: payload,
        })
        .then(() =>{
            window.location.href = '/#/g7th/stock'
            window.location.reload(false)
        }
        );
    }

    return(

    <SimpleForm toolbar="">

        {/* <NumberInput  record={record} source="id" label="Id"/> */}
        <NumberInput source="Costs" validate={required()} value={costs} onChange={(e) => setCosts(e.target.value)}/>
        <NumberInput source="Margin" validate={required()} value={margin} onChange={(e) => setMargin(e.target.value)}/>
        <NumberInput source="Dealer Price Multiplier" validate={required()} value={dealer_multiplier} onChange={(e) => setDealer_multiplier(e.target.value)}/>
        <SaveButton label = "Update fields" onClick={handleSubmit}/>
    </SimpleForm>
    

)}



export const MarginChangeAll = ({record,...props}) => {

    // const postDefaultValue = () => ({costs: 0.7, margin: 15, dealer_multiplier: 2 });
    
    const [costs, setCosts] = useState("");
    const [margin, setMargin] = useState("");
    const [dealer_margin, setDealer_margin] = useState("");

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     let payload = new FormData()
    //     payload.append('costs', costs)
    //     payload.append('margin', margin)
    //     payload.append('dealer_multiplier', dealer_multiplier)
    //     fetch('http://localhost:8000/stock/general/margin-update/', {
    //         method: 'post',
    //         body: payload,
    //     })
    //     .then(() =>{
    //         window.location.href = '/#/general/stock'
    //         window.location.reload(false)
    //     }
    //     );
    // }

    const postSave = (data) => {
        console.log(data)
        let payload = new FormData()
        payload.append('costs', data.costs)
        payload.append('margin', data.margin)
        payload.append('dealer_margin', data.dealer_margin)
        fetch('http://localhost:8000/stock/general/margin-update/', {
            method: 'post',
            body: payload
        })
        .then(() =>{
            window.location.href = '/#/general/stock'
            window.location.reload(false)
        }
        );
    };

    const MyToolbar = props => (
        <Toolbar>
            <SaveButton type="button" label="Save to make more money"/>
            {/* <DeleteButton /> */}
        </Toolbar>
    );

    const redirect = () => `/#/g7th_stock`;

    return(

    <SimpleForm alwaysEnable onSubmit={postSave} redirect={redirect}>

        {/* <NumberInput  record={record} source="id" label="Id"/> */}
        <NumberInput source="costs" lable="Costs"  value={costs} onChange={(e) => setCosts(e.target.value)}/>
        <NumberInput source="margin" label = "Our margin"  value={margin} onChange={(e) => setMargin(e.target.value)}/>
        <NumberInput source="dealer_margin" label="Dealer Margin"  value={dealer_margin} onChange={(e) => setDealer_margin(e.target.value)}/>
        {/* <SaveButton label = "Update money making fields" onClick={handleSubmit}/> */}
    </SimpleForm>
    

)}