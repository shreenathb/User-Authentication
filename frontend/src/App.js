import Login from './components/Login';
import Navbar from './components/Navbar';
import {LoginContext} from './contexts/LoginContext'
import { useState } from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <h1>Welcome</h1>
        <Link to="/login">
          <button type="button">
            Login
          </button>
        </Link>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <Login />
      </div>
    )
  },
]);

function App() {
  const [loginState, setloginState] = useState(false);
  return (
    <LoginContext.Provider value={{loginState, setloginState}}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </LoginContext.Provider>

  );
}

export default App;
