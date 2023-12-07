import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import Album from './Album';
import Cards from './Cards';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Drawer from './Drawer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.Fragment>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={    <Drawer />}>
          <Route index element={<></>} />
          <Route path="blogs" element={<></>} />
          <Route path="contact" element={<></>} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>



  </React.Fragment>,
  document.getElementById('root'),
);
