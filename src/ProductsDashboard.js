import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput ,CustomRoutes} from 'react-admin';
import * as React from "react";
import PostIcon from '@mui/icons-material/Book';
import drfProvider from 'ra-data-django-rest-framework';
import { MyLayout } from './layout';
import {CreateStock} from './pricelist/Views'
// import { FileUpload } from "./pricelist/FileUpload";
import { MarginChange, MarginChangeAll } from "./g7th/MarginUpdate";
// import { OrcaList } from "./orca/Views";
import { WebsiteProductEdit, WebsiteProductsList } from "./website-products/Views";

const dataProviderProducts = drfProvider("http://192.168.1.63:8001/products");

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const ProductsDashboard = () => {

    return(
        <Admin basename="/products" dataProvider={dataProviderProducts} title="Products Dashboard" layout={MyLayout}  options={{label: "Stock Mafico"}}>
            
              {/* <CustomRoutes>
                <Route path="/add-stock" element={<CreateStock />} />
                <Route path="/add-stock-csv" element={<FileUpload />} />
                <Route path="/margin-update-single/:id" element={<MarginChange/>} />
                <Route path="/margin-update" element={<MarginChangeAll/>} />
              </CustomRoutes> */}

            <Resource name="list" list={WebsiteProductsList} edit={WebsiteProductEdit} options={{label: "Products View"}} icon={PostIcon} />
                
        </Admin>

  );}
  
  export default ProductsDashboard;