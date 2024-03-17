import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userToken,setUserToken]=useState(localStorage.getItem("userToken"))
  const getUserData=()=>{
if(userToken!=null){
  const decoded = jwtDecode(userToken);
  setUserName(decoded.userName)
  console.log(userName)
}}
  useEffect(()=>{

    getUserData();
  },[userToken])
  return (
    <UserContext.Provider value={{ userName, setUserName,setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

