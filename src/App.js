import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { reducer, initialState } from "./Reducer/userReducer";
import ManagerRouting from "./ManagerRoutes";

export const UserContext = createContext();
function App() {

  useEffect(() => {
    console.log = function () { }

  }, [0])

  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // <UserContext.Provider value={{ state, dispatch }}>
    <BrowserRouter basename={'/manager'}>
      <ManagerRouting />
    </BrowserRouter>
    // </UserContext.Provider>
  );
}
export default App;
