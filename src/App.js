import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import Question from "./components/Question";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="/question" element={<Question />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
