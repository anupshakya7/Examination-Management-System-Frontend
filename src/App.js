import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import Question from "./components/Question";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert,setAlert]= useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    });
    setTimeout(()=>{
      setAlert(null);
    },3000);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container mt-5">
          <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route path="login" element={<Login showAlert={showAlert} />}></Route>
            <Route path="register" element={<Register showAlert={showAlert} />}></Route>
            <Route path="/question" element={<Question showAlert={showAlert} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
