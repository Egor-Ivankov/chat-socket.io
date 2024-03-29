import ReactDOM from 'react-dom/client';
import AppRoutes from "../app-routes/appRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import '../../styles/main.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
)
