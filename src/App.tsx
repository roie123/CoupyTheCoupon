import React from 'react';
import './App.css';
import HomePage from "./Pages/HomePage";
import RoutingConfig from "./ROUTING/Routing";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <div className="app">
          <RoutingConfig/>
        </div>

      </LocalizationProvider>


  );
}

export default App;
