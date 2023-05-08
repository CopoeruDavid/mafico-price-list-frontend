import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput ,CustomRoutes} from 'react-admin';
// import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Routes,Route} from 'react-router'
import PostIcon from '@mui/icons-material/Book';
// import jsonServerProvider from 'ra-data-json-server';
// import simpleRestProvider from 'ra-data-simple-rest';
import drfProvider from 'ra-data-django-rest-framework';

import {G7thEdit, G7thList} from './g7th/G7thListList'
import { PostEdit } from "./g7th/FileUpload";
import { MyLayout } from './layout';
import {CreateStock} from './general/Views'
import { FileUpload } from "./general/FileUpload";
import { MarginChange, MarginChangeAll } from "./g7th/MarginUpdate";
// import { OrcaList } from "./orca/Views";
import { GeneralEdit, GeneralList } from "./general/Views";
import AdminDashboard from "./AdminDashboard";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const dataProvider = simpleRestProvider('http://127.0.0.1:8000');
const dataProviderG7th = drfProvider("http://192.168.1.63:8000/stock");

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const App = () => {
  // const dispatch = useDispatch();
  // dispatch(setAutomaticRefresh(false))
  return(
      // <Admin dataProvider={dataProviderG7th} title="Admin Dashboard" layout={MyLayout}  options={{label: "Stock Mafico"}}>
      //     {/* <Resource name="g7th/stock" list={G7thList} create ={MarginChange} edit={G7thEdit} options={{label: "G7th Prices"}} icon={PostIcon} edit2={MarginChange}/> */}
      //       <CustomRoutes>
      //         <Route path="/add-stock" element={<CreateStock />} />
      //         <Route path="/add-stock-csv" element={<FileUpload />} />
      //         <Route path="/margin-update-single/:id" element={<MarginChange/>} />
      //         <Route path="/margin-update" element={<MarginChangeAll/>} />
      //         {/* <Route path="/generate-website-feed" element={} /> */}
      //       </CustomRoutes>
      //     {/* <Resource name="orca/stock" list={OrcaList} options={{label: "Orca Prices"}} icon={PostIcon} /> */}
      //     <Resource name="general/stock" list={GeneralList} edit={GeneralEdit} options={{label: "Quick Calculation"}} icon={PostIcon} />
              
      // </Admin>
      <BrowserRouter>
      <Routes>
        {/* <Route index element={<h1>Maybe try "/pricelist"</h1>} /> */}
          
        <Route path="/pricelist-frontend/*" element={<AdminDashboard />} />
        
      </Routes>
    </BrowserRouter>

    // <AdminDashboard />
);}

export default App;
