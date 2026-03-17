// import "bootstrap/dist/css/bootstrap.min.css";
// import "./components/Task";
import { ReactNode } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

import ProtectedRoutes from "./Utils/Components/ProtectedRoutes";
import Message from "./components/Message";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
// Your main App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/auth/login"></Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<SignUp />} path="/auth/register"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <SignUp></SignUp> */}
      {/* <Toggle></Toggle>
      <Message name={"Hello"}></Message>
      <InputField title="Name" placeholderText="Enter name here"></InputField> */}
    </div>
  );
}

export default App;
