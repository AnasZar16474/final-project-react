import { Outlet } from "react-router-dom"
import { Link} from "react-router-dom";
import style from "./Profile.module.css"


function Profile() {
  
  return (
   <>
   <div className="d-flex flex-column gap-3 fs-3">

  <Link to="About">About</Link>
  <Link to="contact">contact</Link>
  <Link to="myOrders">MyOrders</Link>
  </div>
  <div className={`d-flex flex-column gap-3 justify-content-center align-items-center flex-wrap ${style.profile}`}>
  <Outlet/>
  </div>
  </>
  )
}

export default Profile