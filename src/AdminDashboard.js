import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput ,CustomRoutes} from 'react-admin';
import * as React from "react";
import PostIcon from '@mui/icons-material/Book';
import drfProvider from 'ra-data-django-rest-framework';
import { MyLayout } from './layout';
import {CreateStock} from './general/Views'
import { FileUpload } from "./general/FileUpload";
import { MarginChange, MarginChangeAll } from "./g7th/MarginUpdate";
// import { OrcaList } from "./orca/Views";
import { GeneralEdit, GeneralList } from "./general/Views";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const dataProvider = simpleRestProvider('http://127.0.0.1:8000');
// const dataProviderG7th = drfProvider("http://192.168.1.63:8000/stock");
const dataProviderG7th = drfProvider("http://localhost:8000/pricelist-backend");

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const AdminDashboard = () => {
    // const dispatch = useDispatch();
    // dispatch(setAutomaticRefresh(false))
    return(
        <Admin basename="/pricelist-frontend" dataProvider={dataProviderG7th} title="Admin Dashboard" layout={MyLayout}  options={{label: "Stock Mafico"}}>
            {/* <Resource name="g7th/stock" list={G7thList} create ={MarginChange} edit={G7thEdit} options={{label: "G7th Prices"}} icon={PostIcon} edit2={MarginChange}/> */}
              <CustomRoutes>
                <Route path="/add-stock" element={<CreateStock />} />
                <Route path="/add-stock-csv" element={<FileUpload />} />
                <Route path="/margin-update-single/:id" element={<MarginChange/>} />
                <Route path="/margin-update" element={<MarginChangeAll/>} />
                {/* <Route path="/generate-website-feed" element={} /> */}
              </CustomRoutes>
            {/* <Resource name="orca/stock" list={OrcaList} options={{label: "Orca Prices"}} icon={PostIcon} /> */}
            <Resource name="stock" list={GeneralList} edit={GeneralEdit} options={{label: "Pricelist View"}} icon={PostIcon} />
                
        </Admin>

  );}
  
  export default AdminDashboard;