import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import CounterContextProvider from "./components/context/CounterContext.jsx";
import AuthContextProvider from "./components/context/AuthContext.jsx";


import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>

        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>

          <ToastContainer />
          <App />

          </QueryClientProvider>
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>,
);
