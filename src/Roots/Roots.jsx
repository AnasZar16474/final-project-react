import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Navbar/Components/Navbar"
import Footer from "../Pages/Footer/Components/Footer"


function Roots() {
  return (
   <>
    <Navbar/>
    <div className="container">
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Roots