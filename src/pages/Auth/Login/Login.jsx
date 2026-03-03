import React, { useContext } from "react";
import { useState } from "react";
import { Input } from "@heroui/input";
import { Alert, DatePicker } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/validationSchemas/authSchema";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { FaTransgender } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { LoginUser } from "../../../Services/AuthServices";
import { LuUser } from "react-icons/lu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../components/context/AuthContext";
import z from "zod";

export default function Login() {
  let [ShowPassword, setShowPassword] = useState(false);

  let [SuccessMessage, setSuccessMessage] = useState("");
  let [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  let { token, setToken } = useContext(AuthContext);
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      setSuccessMessage("");
      setErrorMessage("");

      const isEmail = z
        .string()
        .email()
        .safeParse(data.emailOrUsername).success;

      const payload = {
        password: data.password,
        ...(isEmail
          ? { email: data.emailOrUsername }
          : { username: data.emailOrUsername }),
      };

      let response = await LoginUser(payload);
      console.log(response);

      localStorage.setItem("User token", response.data.token);
      setToken(response.data.token);

      toast.success("Welcome Back", {
        autoClose: 2500,
        progressStyle: {
          background: "#fff",
        },
        theme: "colored",
      });

      navigate("/");
    } catch (error) {
      let errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.response?.status === 404) {
        errorMessage = "Account not found. Please sign up first.";
      } else if (error.response?.status === 403) {
        errorMessage = "Your account has been blocked. Contact support.";
      } else if (!error.response) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      toast.error(errorMessage, {
        autoClose: 3000,
        progressStyle: {
          background: "#fff",
        },
        theme: "colored",
      });
    }
  }
  return (
    <>
      <div className="bg-gray-100 py-12 min-h-screen flex justify-center items-center">
        <form
          className="w-full bg-white max-w-lg mx-auto p-8 rounded-2xl shadow space-y-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          {SuccessMessage && <Alert color="success" title={SuccessMessage} />}
          {ErrorMessage && <Alert color="danger" title={ErrorMessage} />}

          <h2 className="text-3xl font-bold my-2 ">
            Welcome to Our Social App Login Form
          </h2>
          <p className="text-gray-500 text-lg font-semibold my-2">
            {" "}
            Please fill In this Form to Login.
          </p>
          <div className="form-body my-3">
            <Input
              isInvalid={errors.emailOrUsername}
              errorMessage={errors.emailOrUsername?.message}
               classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              label="Email or Username"
              placeholder="Enter your email or username"
              type="text"
              variant="bordered"
              className="pb-4"
              {...register("emailOrUsername")}
              startContent={
                <LuUser
                  style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" , fontSize:"20px" }}
                />
              }
            />
            <Input
              isInvalid={errors.password}
              errorMessage={errors.password?.message}
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              placeholder="Enter your password"
              label="Password"
              type={ShowPassword ? "text" : "password"}
              variant="bordered"
              className="pb-4"
              {...register("password")}
              endContent={
                ShowPassword ? (
                  <HiEyeOff
                    className="text-2xl cursor-pointer "
                    onClick={() => setShowPassword(!ShowPassword)}
                    style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "5px" }}
                  />
                ) : (
                  <HiEye
                    className="text-2xl cursor-pointer "
                    onClick={() => setShowPassword(!ShowPassword)}
                    style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "5px" }}
                  />
                )
              }
              startContent={
                <BiSolidLockAlt
                  style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" }}
                />
              }
            />

            <Button
              isLoading={isSubmitting}
              color="primary"
              variant="shadow"
              className="w-full bg-[#1C285A] "
              type="submit"
            >
              Login
            </Button>
          </div>
          <p className="text-center text-lg font-semibold text-gray-500 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="hover:underline"
              style={{ color: "#00298D"  }}
            >
              register
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
