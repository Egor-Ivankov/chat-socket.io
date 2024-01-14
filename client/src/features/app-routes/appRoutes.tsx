import { Route, Routes } from "react-router-dom";
import Authorization from "../authorizaton/authorization.tsx";
import Chat from "../chat/chat.tsx";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Authorization/>} />
            <Route path="/chat" element={ <Chat/> } />
        </Routes>
    );
}

export default AppRoutes;