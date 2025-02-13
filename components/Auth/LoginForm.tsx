import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

interface CompanyAndUserLoginForm {
  email: string;
  password: string;
}
export default function LoginForm() {
  const Region: string = Cookies.get("region") || MainRegionName;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CompanyAndUserLoginForm>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CompanyAndUserLoginForm> = async (data: CompanyAndUserLoginForm) => {
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
        window.location.pathname = `/${Region}/dashboard`;
      }
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse?.errors) {
          let firstErrorMessage = "";

          Object.keys(errorResponse.errors).forEach((field, index) => {
            const message = errorResponse.errors[field][0];

            if (index === 0) {
              firstErrorMessage = message;
            }

            setError(field as keyof CompanyAndUserLoginForm, {
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

  return (
    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_boxes">
            <label>Email or Username</label>
            <input {...register("email", { required: "Required" })} type="email" placeholder="Creativelayer088" />
            {errors.email && <span className="text-danger text-sm error">{errors.email.message}</span>}
          </div>
          <div className="form_boxes position-relative">
            <label>Password</label>
            <input {...register("password", { required: "Required" })} type={showPassword ? "text" : "password"} placeholder="********" />
            {errors.password && <span className="text-danger text-sm error">{errors.password.message}</span>}
            <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="btn-box row">
            <label className="contain col-md-5">
              Remember
              <input type="checkbox" defaultChecked={true} />
              <span className="checkmark" />
            </label>
            <a href="#" className="pasword-btn text-end col-md-6">
              Forgotten password?
            </a>
          </div>
          <div className="form-submit">
            <button title="login" disabled={isSubmitting} type="submit" className="theme-btn">
              Login <Image alt="" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
        </form>
        <div className="btn-box-two">
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
        </div>
      </div>
    </div>
  );
}
