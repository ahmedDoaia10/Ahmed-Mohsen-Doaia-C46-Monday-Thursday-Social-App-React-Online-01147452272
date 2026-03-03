import React from "react";
import { useState } from "react";
import { Input } from "@heroui/input";
import { Alert, DatePicker } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../lib/validationSchemas/authSchema";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { LuUser, LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";

import { FaAt } from "react-icons/fa6";
import { registerUser } from "../../../Services/AuthServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Register() {
  let [ShowPassword, setShowPassword] = useState(false);
  let [ReShowPassword, setReShowPassword] = useState(false);

  let [SuccessMessage, setSuccessMessage] = useState("");
  let [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      setSuccessMessage("");
      setErrorMessage("");

       if (!data.username) delete data.username;

      let response = await registerUser(data);
      console.log(response.data.message);

      toast.success("Your account has been created", {
        autoClose: 2500,
        progressStyle: {
          background: "#fff",
        },
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      console.log("Full error:", error);

      let errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      if (error.response?.status === 409) {
        errorMessage =
          "This email is already registered. Please use another email or try to login.";
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
            Welcome to Our Social App Registration Form
          </h2>
          <p className="text-gray-500 text-lg font-semibold my-2">
            {" "}
            Please fill In this Form to Create An Account.
          </p>
          <div className="form-body my-3">
            <Input
              isInvalid={errors.name}
              errorMessage={errors.name?.message}
              label="Name"
              placeholder=" Full name"
              type="text"
              variant="bordered"
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              className="pb-4"
              {...register("name")}
              startContent={
                <LuUser
                  style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" , fontSize:"20px" }}
                />
              }
            />
            <Input
              isInvalid={errors.username}
              errorMessage={errors.username?.message}
              label="Username"
              placeholder=" Username (optional)"
              type="text"
              variant="bordered"
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              className="pb-4"
              {...register("username")}
              startContent={
                <FaAt
                  style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" }}
                />
              }
            />
            <Input
              isInvalid={errors.email}
              errorMessage={errors.email?.message}
              validationBehavior="aria" 
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              placeholder="name@example.com"
              label="Email"
              type="text"
              variant="bordered"
              className="pb-4"
              {...register("email")}
              startContent={
                <MdEmail
                  style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" }}
                />
              }
            />
            <Input
              isInvalid={errors.password}
              errorMessage={errors.password?.message}
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              placeholder="Create a strong password"
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

            <Input
              isInvalid={errors.rePassword}
              errorMessage={errors.rePassword?.message}
              classNames={{
                inputWrapper: ["data-[focus=true]:!border-blue-600"],
              }}
              placeholder="Confirm your password"
              label="Re-Password"
              type={ReShowPassword ? "text" : "password"}
              variant="bordered"
              className="pb-4"
              {...register("rePassword")}
              endContent={
                ReShowPassword ? (
                  <HiEyeOff
                    className="text-2xl cursor-pointer "
                    onClick={() => setReShowPassword(!ReShowPassword)}
                    style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "5px" }}
                  />
                ) : (
                  <HiEye
                    className="text-2xl cursor-pointer "
                    onClick={() => setReShowPassword(!ReShowPassword)}
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

            <div className="flex items-center gap-3 justify-content-between  ">
              <Input
                isInvalid={errors.dateOfBirth}
                errorMessage={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
                variant="bordered"
                classNames={{
                  inputWrapper: ["data-[focus=true]:!border-blue-600"],
                }}
                className="pb-4"
                type="date"
                label="Birth date"
                style={{ color: "#364153" }}
                startContent={
                  <FiCalendar
                    style={{ color: "hsl(240 5.2% 33.92% / 1)", margin: "2px" }}
                  />
                }
              />

              <Select
                isInvalid={errors.gender}
                errorMessage={errors.gender?.message}
                placeholder="Select your gender"
                variant="bordered"
                color="primary"
                className="pb-4 "
                classNames={{
                  label: "text-gray-700",
                 
                }}
                label="Select a Gender"
                {...register("gender")}
                startContent={
                  <LuUsers
                    size={18}
                    style={{ color: "hsl(240 5.2% 33.92% / 1)" }}
                  />
                }
              >
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>
            </div>
            <Button
              isLoading={isSubmitting}
              color="primary"
              variant="shadow"
              className="w-full bg-[#1C285A] "
              type="submit"
            >
              Register
            </Button>
          </div>
          <p className="text-center text-lg font-semibold text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className=" hover:underline"
              style={{ color: "#00298D" }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
