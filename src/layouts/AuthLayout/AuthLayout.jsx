import React from "react";
import app from "../../assets/auth/App.png";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      
      <div className="w-full md:w-1/2 relative h-80 md:h-auto">
        <img
          src={app}
          alt="auth"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-700/80"></div>
        <div className="relative z-10 text-white p-6 md:p-12 flex flex-col justify-center h-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Welcome Back
          </h1>
          <p className="text-sm md:text-lg opacity-90">
            Sign in to connect people all over the world
          </p>
        </div>

      </div>

      
      <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </div>

    </div>
  );
}