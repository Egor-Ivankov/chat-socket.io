import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from "../app-routes/appRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import '../../styles/main.scss';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </React.StrictMode>,
)
