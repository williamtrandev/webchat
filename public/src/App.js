import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetAvatar from "./pages/SetAvatar";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/setAvatar" element={<SetAvatar />} />
            </Routes>
        </BrowserRouter>
    );
}
// import React from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // toast.configure();
// function App() {
//     const notify = () => {
//         toast("Wow so easy!");
//     };

//     return (
//         <div>
//             <button onClick={notify}>Notify!</button>
//             <ToastContainer />
//         </div>
//     );
// }
export default App;
