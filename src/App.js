import { Route, Routes } from "react-router-dom";
import "./App.css";
import TheLayout from "./container/TheLayout";
import Login from "./View/login/Login";
import Register from "./View/register/Register";

function App() {
  return (
    <Routes>
      <Route exact path="/login" name="Login" element={<Login />} />
      <Route exact path="/register" name="Register" element={<Register />} />
      <Route exact path="*" name="Home" element={<TheLayout />} />
    </Routes>
  );
}

export default App;
