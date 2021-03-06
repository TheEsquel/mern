import React from "react";
import 'materialize-css'
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./component/Navbar";

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated =  !!token
  const routes = useRoutes(isAuthenticated)
    
  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
          <Router>
              {isAuthenticated && <Navbar/>}
              <div className="container">
                  {routes}
              </div>
          </Router>
      </AuthContext.Provider>
  );
}

export default App;
