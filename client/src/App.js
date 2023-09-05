import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Layout from "./components/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./app.css";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* unprotected route  */}
        <Route path="/" element={user ? <Home /> : <Register />} />

        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;