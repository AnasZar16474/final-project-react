import { NavLink, useNavigate } from "react-router-dom";
import style from "./../Style/Navbar.module.css";
import { UserContext } from "../../../context/User";
import { useContext } from "react";
import { CartContext } from "../../../context/Cart";
function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const { count } = useContext(CartContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
    navigate("/Signin");
  };
  return (
    <>
      <p className="text-center fs-2 text-primary">welcome {userName}</p>
      <header className={style.header}>
        <div className="container">
          <div className={style.row}>
            <div className={style.list}>
              {userName ? (
                <div className={style.row}>
                  <div className={style.ulOne}>
                    <ul>
                      <li>
                        <NavLink className={style.home} to="/">
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={style.home} to="Categories">
                          Categories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={style.home} to="Products">
                          Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={style.home} to="Cart">
                          Cart <span className={style.span}>{count}</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      className="bg-danger p-3 mt-3 rounded-3"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.ulTwo}>
                  <ul>
                    <div className={style.auth}>
                      <NavLink to="Signin" className={style.signup}>
                        SignIn
                      </NavLink>
                      <NavLink to="SignUp" className={style.login}>
                        SignUp
                      </NavLink>
                    </div>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
