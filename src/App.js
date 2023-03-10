import React, { useState } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from './components/Login/login';
import useToken from './components/App/useToken';
import Register from './components/Register/register';
import ExplicationApplication from "./components/Login/explicationapp";
import Bien from "./scenes/biens";
import Addbien from "./scenes/biens/addbien";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { token, setToken } = useToken();
  const { user, setUser } = useToken();

  const location = useLocation();
  if (!token && location.pathname === '/register') {
    return (<Register />)
  }

  else if(!token) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <main className="content">
              <div className="wrapper">
                <div>
                  <ExplicationApplication />
                </div>
                <div>
                  <Login setToken={setToken} setUser={setUser}/>
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} user={user} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/bien" element={<Bien user={user} />} />
                <Route path="/addbien" element={<Addbien user={user} />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form user={user} />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}


export default App;
