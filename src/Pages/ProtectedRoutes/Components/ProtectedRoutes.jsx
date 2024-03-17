

import { Navigate } from "react-router-dom"


function ProtectedRoutes({children}) {
    const token=localStorage.getItem("userToken")
    if(!token){
        return <Navigate to="/signIn" replace/>
    }
    return children
}

export default ProtectedRoutes