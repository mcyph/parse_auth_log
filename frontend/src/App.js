import React, { useState } from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Checkbox, FormControlLabel, Tab, Tabs } from "@material-ui/core";

import FlagIcon from '@material-ui/icons/Flag';
import PublicIcon from '@material-ui/icons/Public';
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall';

import './App.css';
import { World, StatesProvinces, Countries, ByDates, ByHour, ByUser } from "./pages";

function App() {
  // Get the current page element based on the selected tab
  let [currentTab, setTab] = useState("World");
  let [per100k, setPer100k] = useState(false);

  return <>
      <div style={{
        minHeight: "100vh",
        paddingBottom: "50px",
        fontFamily: "monospace"
      }}>
        <h1 style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          margin: 0
        }}>
          L337 HaX0r Logins
        </h1>
        <Countries />
        <ByDates />
        <ByHour />
        <ByUser />
      </div>
  </>;
}

export default App;
