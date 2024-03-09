import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Roots/Roots";
import Cart from "./Pages/Cart/Components/Cart";
import Categories from "./Pages/Categories/Components/Categories";
import Signin from "./Pages/Signin/Components/Signin";
import Signup from "./Pages/Signup/Components/Signup";
import Products from "./Pages/Products/Components/Products";
import Error from "./Pages/Error/Components/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots/>,
      children:[{
        path:"/",
        element:<Categories/>,
      },
    {
      path:"/signin",
      element:<Signin/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/products/:id",
      element:<Products/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/categories",
      element:<Categories/>
    },
    {
      path:"/*",
      element:<Error/>
    },]
    },
  ]);
  return <>
  
  
  <RouterProvider router={router} />
  <ToastContainer />
  
  
  </>;
}

export default App;
