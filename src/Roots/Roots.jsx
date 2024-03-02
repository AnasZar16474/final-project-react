import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Navbar/Components/Navbar"
import Footer from "../Pages/Footer/Components/Footer"


function Roots() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Roots