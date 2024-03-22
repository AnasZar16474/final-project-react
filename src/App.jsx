import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Roots/Roots";
import Cart from "./Pages/Cart/Components/Cart";
import Categories from "./Pages/Categories/Components/Categories";
import Signin from "./Pages/Signin/Components/Signin";
import Signup from "./Pages/Signup/Components/Signup";
import ProductsWithCategories from "./Pages/Products/Components/ProductsWithCategories";
import Error from "./Pages/Error/Components/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./Pages/ProtectedRoutes/Components/ProtectedRoutes";
import UserContextProvider from "./context/User";
import Products from "./Pages/ProductsAll/Components/Products";
import SendCode from "./Pages/SendCode/Components/SendCode";
import ForgotPassword from "./Pages/ForgotPassword/Components/ForgotPassword";
import Product from "./Pages/Product/Cpmponents/Product";
import Order from "./Pages/Order/Components/Order";
import Profile from "./Pages/Profile/Components/Profile";
import CartContextProvider from "./context/Cart";

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
      path:"/products",
      element:<Products/>
    },
    {
      path:"/products/:id",
      element:<ProductsWithCategories/>
    },
    {
      path:"/cart",
      element:
      <ProtectedRoutes>
         <Cart/>
      </ProtectedRoutes>
     
    },
    {
      path:"/categories",
      element:<Categories/>
    },
    {
      path:"/SendCode",
      element:<SendCode/>
    },
    {
      path:"/ForgotPassword",
      element:<ForgotPassword/>
    },
    {
      path:"/Product/:id",
      element:<Product/>
    },
    {
      path:"/Order",
      element:
      <ProtectedRoutes>
      <Order/>
      </ProtectedRoutes>
    },
    {
      path:"/Profile",
      element:
      <ProtectedRoutes>
      <Profile/>
      </ProtectedRoutes>
    },
    {
      path:"/*",
      element:<Error/>
    },]
    },
  ]);
  return <>
  <CartContextProvider>
  <UserContextProvider>
  <RouterProvider router={router} />
  </UserContextProvider>
  </CartContextProvider>
  <ToastContainer />
  
  
  </>;
}

export default App;
