import "./styles/App.scss";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppDispatch, RootState } from "./redux/store";
import { createContext, useContext, useEffect, useState } from "react";
import HOKAuthChecker from "./components/HOKs/HOKAuthChecker";
import Profile from "./components/pages/Profile/Profile";
import HOKAuthCheckerForAuth from "./components/HOKs/HOKAuthCheckerForAuth";
import Chat from "./components/pages/Chat/Chat";
// import { RootState } from "@reduxjs/toolkit/query";

import { Helmet } from "react-helmet";
import { logoFire } from "./config/icons";
import { io, Socket } from "socket.io-client";
import config from "./config/config";
import { IPropsChildren } from "./types/props/props";
import { setChatsDirect, setChatsGroup } from "./redux/slice/chatSlice";

const Context = createContext<Socket | null>(null);

function ContextSocket({ children }: IPropsChildren) {
  const [socket, setSocket] = useState<Socket>();

  const dispatch = useDispatch<AppDispatch>();

  let user = useSelector((state: RootState) => state.authSlice.user);
  let tokens = useSelector((state: RootState) => state.authSlice.tokens);

  useEffect(() => {
    if (user && tokens && tokens.access_token) {
      async function socketio(tokenStr: string) {
        let socket = io(config.websocket.url, {
          auth: {
            token: tokenStr,
          },
        });

        setSocket(socket);

        // if (socket) {
        //   console.log("YEAsssshh");
        //   socket.on("message", (data: IDBMessage) => {
        //     console.log("Socket message");
        //     dispatch(setNewMessage(data));
        //   });
        // }
      }

      socketio(tokens.access_token);
    }

    return () => {
      setSocket(socket?.disconnect());
    };
  }, [user]);

  // useEffect(() => {
  //   console.log(socket);
  //   if (socket && socket.connected) {
  //     console.log("WOW");
  //     socket.on("message", (response: any) => {
  //       console.log(response);
  //     });
  //   } else if (socket && !socket.connected) {
  //     console.log("Error!!!!");
  //   }
  // }, [socket, socket?.connected]);

  return (
    <Context.Provider value={socket ? socket : null}>
      {children}
    </Context.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(Context);

  return context;
}

function App() {
  let userId = useSelector((state: RootState) => state.authSlice.user?.id);
  // let username = useSelector(
  //   (state: RootState) => state.authSlice.user?.username
  // );

  let dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(userId, "changeddd");
    if (userId == undefined) {
      console.log("SOMETHINGGG");
      dispatch(setChatsDirect([]));
      dispatch(setChatsGroup([]));
    }
  }, [userId]);

  return (
    <ContextSocket>
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logoFire} />
        </Helmet>
        <BrowserRouter>
          <Routes>
            {/* <Route path="*" element={<div>ererer</div>} /> */}
            <Route
              path="/auth"
              element={
                <>
                  <Helmet>
                    <title>Авторизация</title>
                  </Helmet>
                  <HOKAuthCheckerForAuth />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  <Helmet>
                    <title>Profile page</title>
                  </Helmet>
                  <HOKAuthChecker>
                    <Profile />
                  </HOKAuthChecker>
                </>
              }
            />

            <Route
              path="/chat"
              element={
                <>
                  {/* <Favicon url={logoFire} /> */}

                  <Helmet>
                    <title>FireChat</title>
                  </Helmet>
                  <HOKAuthChecker>
                    <Chat />
                  </HOKAuthChecker>
                </>
              }
            />

            <Route
              path="/*"
              element={
                <HOKAuthChecker>
                  <>
                    <Helmet>
                      <title>Мой профиль</title>
                    </Helmet>
                    <Navigate to="/profile" />
                  </>
                </HOKAuthChecker>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextSocket>
  );
}

export default App;
