import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { LuKeyRound } from "react-icons/lu";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "../../lib/validationSchemas/authSchema";
import { ChangePassword as changePasswordAPI } from "../../Services/AuthServices";

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(data) {
    setSuccess("");
    setError("");
    try {
      const response = await changePasswordAPI({
        password: data.currentPassword,
        newPassword: data.password,
      });

      localStorage.setItem("User token", response.data.token);

      setSuccess("Password updated successfully!");
      reset();

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  const eyeStyle = { color: "hsl(240 5.2% 33.92% / 1)", margin: "5px" };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start pt-5 justify-center">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <LuKeyRound className="text-blue-400 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-400">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Current password
            </label>
            <Input
              isInvalid={!!errors.currentPassword}
              errorMessage={errors.currentPassword?.message}
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: [
                  "data-[focus=true]:!border-blue-500",
                  "data-[invalid=true]:!border-blue-500",
                ],
              }}
              {...register("currentPassword")}
              endContent={
                showCurrent ? (
                  <HiEyeOff
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowCurrent(false)}
                    style={eyeStyle}
                  />
                ) : (
                  <HiEye
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowCurrent(true)}
                    style={eyeStyle}
                  />
                )
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              New password
            </label>
            <Input
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: [
                  "data-[focus=true]:!border-blue-500",
                  "data-[invalid=true]:!border-blue-500",
                ],
              }}
              {...register("password")}
              endContent={
                showNew ? (
                  <HiEyeOff
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowNew(false)}
                    style={eyeStyle}
                  />
                ) : (
                  <HiEye
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowNew(true)}
                    style={eyeStyle}
                  />
                )
              }
            />
            <p className="text-xs font-medium text-[#62748E]">
              At least 8 characters with uppercase, lowercase, number, and
              special character.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Confirm new password
            </label>
            <Input
              isInvalid={!!errors.rePassword}
              errorMessage={errors.rePassword?.message}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: [
                  "data-[focus=true]:!border-blue-500",
                  "data-[invalid=true]:!border-blue-500",
                ],
              }}
              {...register("rePassword")}
              endContent={
                showConfirm ? (
                  <HiEyeOff
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowConfirm(false)}
                    style={eyeStyle}
                  />
                ) : (
                  <HiEye
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowConfirm(true)}
                    style={eyeStyle}
                  />
                )
              }
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <Button
            type="submit"
            color="primary"
            radius="lg"
            isLoading={isSubmitting}
            className="w-full mt-1 font-semibold"
          >
            Update password
          </Button>
        </form>
      </div>
    </div>
  );
}
