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
import {CreateStock} from './pricelist/Views'
import { FileUpload } from "./pricelist/FileUpload";
import { MarginChange, MarginChangeAll } from "./g7th/MarginUpdate";
// import { OrcaList } from "./orca/Views";
import { GeneralEdit, GeneralList } from "./pricelist/Views";
import AdminDashboard from "./AdminDashboard";
import ProductsDashboard from "./ProductsDashboard";
import BasicSignIn from "./components/Login";
import './assets/scss/themes.scss';
import CoverSignIn from "./components/CoverSignIn";
import BasicSignUp from "./components/Register";




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
  // if (sessionStorage.getItem('token') != null){
    return(
        <BrowserRouter>
        <Routes>
          <Route index element={<h1>Maybe try adding "/internal" in the url</h1>} />
          <Route path="/internal/*" element={<AdminDashboard />} />
          <Route path="/products/*" element={<ProductsDashboard />} />
          <Route path="/login" element={<BasicSignIn />} />
          <Route path="/register" element={<BasicSignUp />} />
          
        </Routes>
      </BrowserRouter>

      // <AdminDashboard />
  );
// }
  // else {
//     return(
//       <BrowserRouter>
//       <Routes>
//         {/* <Route index element={<h1>Maybe try adding "/pricelist-frontend" in the url</h1>} />
//         <Route path="/internal/*" element={<AdminDashboard />} />
//         <Route path="/products/*" element={<ProductsDashboard />} /> */}
//         <Route path="/*" element={<BasicSignIn />} />
//       </Routes>
//     </BrowserRouter>
// );
//   }

}

export default App;
