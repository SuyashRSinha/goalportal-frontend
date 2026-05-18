import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BrowserRouter }
from "react-router-dom";

import {
  PublicClientApplication
} from "@azure/msal-browser";

import {
  MsalProvider
} from "@azure/msal-react";

const msalInstance =
  new PublicClientApplication({

    auth: {

      clientId:
        "71882a04-bfb7-4aa8-9989-cb11adc9f5c4",

      authority:
        "https://login.microsoftonline.com/3f100894-4476-4ae4-bdcb-45f626c6e49a",

      redirectUri:
        "http://localhost:5173"

    }

  });

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <MsalProvider instance={msalInstance}>

        <App />

      </MsalProvider>

    </BrowserRouter>

  </React.StrictMode>

);