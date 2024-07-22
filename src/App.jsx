import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { verifyUser } from "./services/users.js";
import SignUp from "./screens/SignUp/SignUp.jsx";
import SignIn from "./screens/SignIn/SignIn.jsx";
import SignOut from "./screens/SignOut/SignOut.jsx";
import CalendarScreen from './screens/CalendarScreen/CalendarScreen.jsx';
import GameDetails from './screens/GameDetails/GameDetails.jsx';
import Layout from './components/Layout/Layout';

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
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in"/>} />
          <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
          <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
          <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
          <Route path="/calendar" element={<CalendarScreen user={user} />} />
          <Route path="/game/:gameId" element={<GameDetails user={user} />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;