import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from "./pages/auth/Signup.tsx";
import Login from "./pages/auth/Login.tsx";
import {AdminDashboard} from "./pages/admin/AdminDashboard.tsx";
import {UserDashboard} from "./pages/user/UserDashboard.tsx";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/user/About.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/', element: <Home/>,
      children: []
    },
    {path: '/signup', element: <Signup/>},
    {path: '/login', element: <Login/>},
    {path: '/admin', element: <AdminDashboard/>},
    {path: '/user', element: <UserDashboard/>},
    {path: '/about', element: <About/>}
  ])

  return <RouterProvider router={routes}/>
}

export default App
