import "./styles/App.scss";
import { io } from "socket.io-client";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "./components/pages/Auth/Auth";
import { AppDispatch, RootState, store } from "./redux/store";
import { useAuthMeMutation } from "./redux/api/auth.api";
import { useEffect } from "react";
import { setAccessToken, setTokens, setUser } from "./redux/slice/authSlice";
import HOKAuthChecker from "./components/HOKs/HOKAuthChecker";
import Profile from "./components/pages/Profile/Profile";
import HOKAuthCheckerForAuth from "./components/HOKs/HOKAuthCheckerForAuth";
import Chat from "./components/pages/Chat/Chat";
// import { RootState } from "@reduxjs/toolkit/query";

// export const socket = io('http://localhost:3010', {
//   autoConnect: false,
// });

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<div>ererer</div>} /> */}
          <Route path="/auth" element={<HOKAuthCheckerForAuth />} />

          <Route
            path="/profile"
            element={
              <HOKAuthChecker>
                <Profile />
              </HOKAuthChecker>
            }
          />

          <Route
            path="/profile"
            element={
              <HOKAuthChecker>
                <Profile />
              </HOKAuthChecker>
            }
          />

          <Route
            path="/chat"
            element={
              <HOKAuthChecker>
                <Chat />
              </HOKAuthChecker>
            }
          />

          <Route
            path="/*"
            element={
              <HOKAuthChecker>
                <Navigate to="/profile" />
              </HOKAuthChecker>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
