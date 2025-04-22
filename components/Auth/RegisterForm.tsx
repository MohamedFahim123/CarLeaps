"use client";

import { useCountriesStore } from "@/app/store/countries";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

type IFormInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  country_id: string;
  privacy_policy: boolean | "empty";
  type: string;
  documents: FileList;
};
export default function RegisterForm() {
  const { countries } = useCountriesStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const Region: string = Cookies.get("region") || MainRegionName;

    const toastId = toast.loading("Submitting...");

    const formData = new FormData();

    if (!data.privacy_policy) {
      data.privacy_policy = "empty";
    }

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IFormInput];

      if (key === "documents" && value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append("documents[]", file));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await axios.post(`${baseUrl}/dealer/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      toast.dismiss(toastId);

      toast.success(response?.data?.message || "Registration Successful!", {
        autoClose: 1500,
      });
      reset();
      const token: string = response?.data?.data?.token;
      if (token) {
        await axios.post("/api/token", { token });
        window.location.href = `/${Region}/dashboard`;
      }
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse?.errors) {
          let firstErrorMessage = "";

          Object.entries(errorResponse.errors).forEach(([field, messages], index) => {
            const message = (messages as string[])[0];
            if (index === 0) firstErrorMessage = message;
            setError(field as keyof IFormInput, { type: "server", message });
          });

          toast.error(firstErrorMessage || "Registration failed!", {
            autoClose: 1500,
          });
        } else {
          toast.error(errorResponse?.message || "Registration Failed!", {
            autoClose: 1500,
          });
        }
      } else {
        toast.error("An unexpected error occurred!", { autoClose: 1500 });
      }
    }
  };

  return (
    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
      <div className="form-box two">
        <form className="border-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_boxes">
            <label>Name</label>
            <input {...register("name", { required: "Required" })} type="text" placeholder="Creativelayer088" />
            {errors.name && <div className="text-danger text-small">{errors.name.message}</div>}
          </div>
          <div className="form_boxes">
            <label>Email</label>
            <input {...register("email", { required: "Required" })} type="email" placeholder="Creative@gmail.com" />
            {errors.email && <div className="text-danger text-small">{errors.email.message}</div>}
          </div>
          <div className="form_boxes">
            <label>Phone</label>
            <input {...register("phone", { required: "Required" })} type="tel" placeholder={"+67"} />
            {errors.phone && <div className="text-danger text-small">{errors.phone.message}</div>}
          </div>
          <div className="d-flex gap-2 w-100">
            <div className="form_boxes w-50">
              <label htmlFor="reg-country-id">country</label>
              <select className="form-select" defaultValue={""} {...register("country_id", { required: "Required" })} id="reg-country-id">
                <option value="" disabled>
                  select
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country_id && <div className="text-danger text-small">{errors.country_id.message}</div>}
            </div>
            <div className="form_boxes w-50">
              <label htmlFor="reg-type-id">type</label>
              <select className="form-select" defaultValue={""} {...register("type", { required: "Required" })} id="reg-type-id">
                <option value="" disabled>
                  select type
                </option>
                <option value="authorized_dealer">Authorized Dealer</option>
                <option value="showroom">Show Room</option>
              </select>
              {errors.type && <div className="text-danger text-small">{errors.type.message}</div>}
            </div>
          </div>
          <div className="form_boxes position-relative">
            <label>Password</label>
            <input {...register("password", { required: "Required" })} type={showPassword ? "text" : "password"} placeholder="********" />
            {errors.password && <div className="text-danger text-small">{errors.password.message}</div>}
            <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="form_boxes ">
            <label>Documents</label>
            <input className="form-control form-control-sm h-25" {...register("documents", { required: "Required" })} type="file" accept="application/pdf,application/file" multiple />
            {errors.documents && <div className="text-danger text-small">{errors.documents.message}</div>}
          </div>
          <div className="btn-box mt-0 mb-3">
            <label className="contain">
              I accept the privacy policy
              <input {...register("privacy_policy", { required: "Required" })} type="checkbox" />
              {errors.privacy_policy && <div className="text-danger text-small">{errors.privacy_policy.message}</div>}
              <span className="checkmark" />
            </label>
          </div>
          <div className="form-submit">
            <button title="register" disabled={isSubmitting} type="submit" className="theme-btn">
              Register <Image alt="" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
        </form>
        {/* <div className="btn-box-two">
          <span>OR</span>
          <div className="social-btns row ">
            <a href="#" className="fb-btn col-md-5 mx-1">
              <i className="fa-brands fa-facebook" />
              Facebook
            </a>
            <a href="#" className="fb-btn two col-md-5 mx-1">
              <i className="fa-brands fa-google" />
              Google
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
