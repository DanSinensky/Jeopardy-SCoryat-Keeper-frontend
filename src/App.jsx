import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { verifyUser } from "./services/users.js";
import SignUp from "./screens/SignUp/SignUp.jsx";
import SignIn from "./screens/SignIn/SignIn.jsx";
import SignOut from "./screens/SignOut/SignOut.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };
    fetchUser();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <Navigate to="/sign-in"/>
          }
        />
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
        <Route path="/sign-in" element={<SignIn  setUser={setUser} />} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
