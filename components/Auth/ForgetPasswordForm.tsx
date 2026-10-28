"use client";

import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ForgetPasswordFormValues {
  email: string;
}

export default function ForgetPasswordForm() {
  const Region: string = Cookies.get("region") || MainRegionName;
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>();

  const onSubmit: SubmitHandler<ForgetPasswordFormValues> = async (data) => {
    const toastId = toast.loading("Submitting...");

    try {
      const response = await axios.post(
        `${baseUrl}/dealer/forget-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      toast.dismiss(toastId);
      toast.success(
        response?.data?.message || "Reset instructions sent!",
        { autoClose: 2000 }
      );

      const token: string | undefined = response?.data?.data?.token;
      reset();
      if (token) {
        window.location.assign(
          `/${Region}/auth/reset-password?token=${encodeURIComponent(token)}`
        );
      }
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse?.errors) {
          let firstErrorMessage = "";
          Object.keys(errorResponse.errors).forEach((field, index) => {
            const message = errorResponse.errors[field][0];
            if (index === 0) firstErrorMessage = message;
            setError(field as keyof ForgetPasswordFormValues, {
              type: "server",
              message,
            });
          });
          toast.error(firstErrorMessage || "Request failed!", {
            autoClose: 1500,
          });
        } else {
          toast.error(errorResponse?.message || "Request Failed!", {
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
      id="nav-forget"
      role="tabpanel"
      aria-labelledby="nav-forget-tab"
    >
      <div className="form-box">
        <form className="border-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_boxes">
            <label>Email</label>
            <input
              {...register("email", { required: "Required" })}
              type="email"
              placeholder="dealer@carleaps.com"
            />
            {errors.email && (
              <span className="text-danger text-sm error">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-submit">
            <button
              title="forget-password"
              disabled={isSubmitting}
              type="submit"
              className="theme-btn"
            >
              Send Reset Link{" "}
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
