import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput ,CustomRoutes, defaultTheme} from 'react-admin';
import * as React from "react";
import PostIcon from '@mui/icons-material/Book';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LanguageIcon from '@mui/icons-material/Language';
import drfProvider from './auth/index.ts';
import tokenAuthProvider from "./auth/tokenAuthProvider.ts";
import { fetchJsonWithAuthToken } from "./auth/tokenAuthProvider.ts";
// import tokenAuthProvider from "ra-data-django-rest-framework";
import { MyLayout } from './layout';
import {CreateStock} from './pricelist/Views'
import { FileUpload } from "./pricelist/FileUpload";
import { MarginChange, MarginChangeAll } from "./g7th/MarginUpdate";
// import { OrcaList } from "./orca/Views";
import { GeneralEdit, GeneralList } from "./pricelist/Views";
import { WebsiteProductsList, WebsiteProductEdit } from "./website-products/Views";
import { SnelStartProductsList } from "./snelstart-products/Views";
import { WebsiteTrademarksEdit, WebsiteTrademarksList } from "./website-trademarks/Views";
import { deepOrange, orange, red } from "@mui/material/colors";
// import authProvider, { AuthProvider } from "./components/AuthProvider"
import BasicSignIn from "./components/Login";
import { fetchUtils } from "react-admin";



// const fetchJsonWithAuthToken = (url, options = {}) => {
//   options.user = {
//       authenticated: true,
//       // use the token from local storage
//       token: localStorage.getItem('token')
//   };
//   return tokenAuthProvider.fetchJsonWithAuthToken(url, options);
// };

const authProvider = tokenAuthProvider({
  obtainAuthTokenUrl: 'http://192.168.1.63:8000/auth/signin/',
})

const dataProviderG7th = drfProvider("http://192.168.1.63:8000", fetchJsonWithAuthToken);


const myTheme = {
  ...defaultTheme,
  palette: {
      // mode: 'white',
      primary: orange,
      secondary: orange,
      error: red,
  },
  typography: {
      fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Arial',
          'sans-serif',
      ].join(','),
  },
};

const AdminDashboard = () => {
  // 
    return(
      // authProvider={authProvider}
        <Admin loginPage={BasicSignIn} authProvider={authProvider} basename="/internal" dataProvider={dataProviderG7th} title="Admin Dashboard" layout={MyLayout} options={{label: "Internal Mafico"}} theme={myTheme} requireAuth>
              <CustomRoutes>
                <Route path="/add-stock" element={<CreateStock />} />
                <Route path="/add-stock-csv" element={<FileUpload />} />
                <Route path="/margin-update-single/:id" element={<MarginChange/>} />
                <Route path="/margin-update" element={<MarginChangeAll/>} />
                {/* <Route path="/generate-website-feed" element={} /> */}
              </CustomRoutes>
            <Resource name="pricelist-backend/stock" list={GeneralList} edit={GeneralEdit} options={{label: "Pricelist Generation"}} icon={PriceCheckIcon} />
            <Resource name="website-products/list" list={WebsiteProductsList} edit={WebsiteProductEdit} options={{label: "Website Products"}} icon={LanguageIcon} />
            <Resource name="website-trademarks/list" list={WebsiteTrademarksList} edit={WebsiteTrademarksEdit} options={{label: "Website Trademarks"}} icon={LanguageIcon} />    
        </Admin>

  );}

  
  export default AdminDashboard;