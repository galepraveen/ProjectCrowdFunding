import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import "./style.css";
import { StateContextProvider } from './context';


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
);