import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from "./pages/auth/Signup.tsx";
import Login from "./pages/auth/Login.tsx";
import {DogFoodStore} from "./pages/admin/DogFoodStore.tsx";
import {DogFoodUser} from "./pages/user/DogFoodUser.tsx";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {CatFoodStore} from "./pages/admin/CatFoodStore.tsx";
import {CatFoodUser} from "./pages/user/CatFoodUser.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/', element: <Home/>,
      children: []
    },
    {path: '/signup', element: <Signup/>},
    {path: '/login', element: <Login/>},
    {path: '/admin/dog-food', element: <DogFoodStore/>},
    {path: '/user/dog-food', element: <DogFoodUser/>},
    {path: '/admin/cat-food', element: <CatFoodStore/>},
    {path: '/user/cat-food', element: <CatFoodUser/>},
    {path: '/about', element: <About/>}
  ])

  return <RouterProvider router={routes}/>
}

export default App
