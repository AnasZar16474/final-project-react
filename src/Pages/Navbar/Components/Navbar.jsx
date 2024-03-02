import { NavLink } from "react-router-dom"
import style from "./../Style/Navbar.module.css"
function Navbar() {
  return (
   <>
    <header className={style.header}>
  <div className="container">
    <div className={style.row}>
        <div className={style.list}>
          <ul >
            <li>
              <NavLink className={style.home}  to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={style.home} to="Categories">Categories</NavLink>
            </li>
            <li>
              <NavLink className={style.home} to="Products">Products</NavLink>
            </li>
            <li>
              <NavLink className={style.home} to="Cart">Cart</NavLink>
            </li>
          </ul>
        </div>
      
        <div className={style.auth}>
          <NavLink to="Signin" className={style.signup}>SignIn</NavLink>
          <NavLink to="SignUp" className={style.login}>SignUp</NavLink>
        </div>
       </div>
       </div>
    </header>
   
   </>
  )
}

export default Navbar