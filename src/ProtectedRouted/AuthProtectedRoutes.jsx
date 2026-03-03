import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/context/AuthContext";

export default function AuthProtectedRoutes({children}) {


    const Navigate = useNavigate()

     let {token} = useContext(AuthContext)





  useEffect(() => {

    if (token) {
        
        Navigate("/")

    }

  }, [token]);

return children

}
