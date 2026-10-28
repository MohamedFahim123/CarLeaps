"use client";

import { isMockMode } from "@/app/lib/config/dataMode";
import { getDemoLoginHint } from "@/app/lib/mock/demoAccount";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type LoginFormValues = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const region = Cookies.get("region") || MainRegionName;
  const [showPassword, setShowPassword] = useState(false);
  const demoHint = isMockMode() ? getDemoLoginHint() : null;
  const form = useForm<LoginFormValues>({
    defaultValues: demoHint
      ? { email: "dealer@carleaps.com", password: "Demo@1234" }
      : { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const toastId = toast.loading("Submitting...");

    try {
      const response = await axios.post(`${baseUrl}/dealer/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      toast.dismiss(toastId);
      toast.success(response?.data?.message || "Login Successful!", {
        autoClose: 1500,
      });

      const token: string = response?.data?.data?.token;
      if (token) {
        await axios.post("/api/token", { token });
        window.location.pathname = `/${region}/dashboard`;
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
            form.setError(field as keyof LoginFormValues, {
              type: "server",
              message,
            });
          });

          toast.error(firstErrorMessage || "Login failed!", {
            autoClose: 1500,
          });
        } else {
          toast.error(errorResponse?.message || "Login Failed!", {
            autoClose: 1500,
          });
        }
      } else {
        toast.error("An unexpected error occurred!", { autoClose: 1500 });
      }
    }
  };

  return {
    region,
    showPassword,
    setShowPassword,
    demoHint,
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  };
}
