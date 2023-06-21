import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { reducer, initialState } from "./Reducer/userReducer";
import ManagerRouting from "./ManagerRoutes";

export const UserContext = createContext();
function App() {

  
  return (
    // <BrowserRouter basename={'/manager'}>
    <BrowserRouter >
      <ManagerRouting />
    </BrowserRouter>
  );
}
export default App;
