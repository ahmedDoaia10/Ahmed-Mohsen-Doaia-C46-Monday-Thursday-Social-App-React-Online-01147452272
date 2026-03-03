
import React, { createContext, useEffect, useState } from 'react' 
import axios from "axios";

const baseURl = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext()

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(() => localStorage.getItem("User token"));
  const [profileData, setProfileData] = useState(null);

  async function getUserProfile(tkn) {
    try {
      let data = await axios.get(`${baseURl}/users/profile-data`, {
        headers: {
          "Authorization": `Bearer ${tkn}`
        }
      });
      setProfileData(data.data.data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserProfile(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, profileData, setProfileData }}> 
      {children}
    </AuthContext.Provider>
  );
}
























// import React, { createContext,  useState } from 'react'

// export const AuthContext = createContext()

// export default function AuthContextProvider({ children }) {

//     const [token, setToken] = useState(
//         () => localStorage.getItem("User token") 
//     )

//     return (
//         <AuthContext.Provider value={{ token, setToken }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }



/////////////////


// import React, { createContext,  useEffect, useState } from 'react'

// import axios from "axios";


// const baseURl = import.meta.env.VITE_BASE_URL;



// export const AuthContext = createContext()


// export default function AuthContextProvider({children}) {

//      const [token , setToken] = useState(null)
//      const [profileData , setProfileData] = useState(null)


    
     
//     useEffect(()=>{
//         if(localStorage.getItem("User token")){
//             setToken(localStorage.getItem("User token"))
//         }
//     },[])

//     async function getUserProfile() {
//          const token = localStorage.getItem("User token")

//     let data = await axios.get(`${baseURl}/users/profile-data`,  {
//         headers: {
           
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     console.log(data.data.data.user);
//     setProfileData(data.data.data.user)
    
//     }

//     useEffect(()=> {
//         if(token){
//             getUserProfile()
//         }
//     },[token])

//   return <AuthContext.Provider value={{token , setToken , profileData}}>{children}</AuthContext.Provider>
// }


