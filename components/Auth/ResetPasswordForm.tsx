"use client";

import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

interface ResetPasswordFormValues {
  password: string;
  password_confirmation: string;
  token: string;
}

export default function ResetPasswordForm() {
  const Region: string = Cookies.get("region") || MainRegionName;
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      token: tokenFromQuery,
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    const toastId = toast.loading("Submitting...");

    try {
      const response = await axios.post(
        `${baseUrl}/dealer/reset-password`,
        {
          token: data.token || tokenFromQuery,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      toast.dismiss(toastId);
      toast.success(response?.data?.message || "Password reset!", {
        autoClose: 1500,
      });
      window.location.pathname = `/${Region}/auth/login`;
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse?.errors) {
          let firstErrorMessage = "";
          Object.keys(errorResponse.errors).forEach((field, index) => {
            const message = errorResponse.errors[field][0];
            if (index === 0) firstErrorMessage = message;
            setError(field as keyof ResetPasswordFormValues, {
              type: "server",
              message,
            });
          });
          toast.error(firstErrorMessage || "Reset failed!", {
            autoClose: 1500,
          });
        } else {
          toast.error(errorResponse?.message || "Reset Failed!", {
            autoClose: 1500,
          });
        }
      } else {
        toast.error("An unexpected error occurred!", { autoClose: 1500 });
      }
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="nav-reset"
      role="tabpanel"
      aria-labelledby="nav-reset-tab"
    >
      <div className="form-box">
        <form className="border-0" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("token")} />
          {!tokenFromQuery && (
            <div className="form_boxes">
              <label>Reset Token</label>
              <input
                {...register("token", { required: "Required" })}
                type="text"
                placeholder="Paste reset token"
              />
              {errors.token && (
                <span className="text-danger text-sm error">
                  {errors.token.message}
                </span>
              )}
            </div>
          )}
          <div className="form_boxes position-relative">
            <label>New Password</label>
            <input
              {...register("password", {
                required: "Required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
            {errors.password && (
              <span className="text-danger text-sm error">
                {errors.password.message}
              </span>
            )}
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="form_boxes position-relative">
            <label>Confirm Password</label>
            <input
              {...register("password_confirmation", {
                required: "Required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type={showConfirm ? "text" : "password"}
              placeholder="********"
            />
            {errors.password_confirmation && (
              <span className="text-danger text-sm error">
                {errors.password_confirmation.message}
              </span>
            )}
            <span
              className="show-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="form-submit">
            <button
              title="reset-password"
              disabled={isSubmitting}
              type="submit"
              className="theme-btn"
            >
              Reset Password{" "}
              <Image alt="" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
          <div className="btn-box row mt-3">
            <Link
              href={`/${Region}/auth/login`}
              className="pasword-btn text-end col-12"
            >
              Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
