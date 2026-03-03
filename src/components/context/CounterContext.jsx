import React, { createContext, useState } from 'react'

export const counterContext = createContext()

export default function CounterContextProvider({children}) {

    const [counter , setCounter] = useState(50)



  return <counterContext.Provider value={{counter , setCounter}}>
           {children}
  </counterContext.Provider>
}
