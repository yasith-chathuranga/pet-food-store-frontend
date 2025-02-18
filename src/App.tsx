import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from "./pages/auth/Signup.tsx";
import Login from "./pages/auth/Login.tsx";
import {AdminDashboard} from "./pages/admin/AdminDashboard.tsx";
import {UserDashboard} from "./pages/user/UserDashboard.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      children: []
    },
    {path: '/signup', element: <Signup/>},
    {path: '/login', element: <Login/>},
    {path: '/admin', element: <AdminDashboard/>},
    {path: '/user', element: <UserDashboard/>},
  ])

  return <RouterProvider router={routes}/>
}

export default App
