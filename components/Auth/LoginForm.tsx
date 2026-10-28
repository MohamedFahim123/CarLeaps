"use client";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginForm } from "@/app/hooks/useLoginForm";

export default function LoginForm() {
  const {
    region,
    showPassword,
    setShowPassword,
    demoHint,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useLoginForm();

  return (
    <div
      className="tab-pane fade show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="form-box">
        <form className="border-0" onSubmit={handleSubmit(onSubmit)}>
          {demoHint ? (
            <p className="text-muted mb-3" style={{ fontSize: 13 }}>
              {demoHint}
            </p>
          ) : null}
          <div className="form_boxes">
            <label>Email or Username</label>
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
          <div className="form_boxes position-relative">
            <label>Password</label>
            <input
              {...register("password", { required: "Required" })}
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
          <div className="btn-box row">
            <label className="contain col-md-5">
              Remember
              <input type="checkbox" defaultChecked={true} />
              <span className="checkmark" />
            </label>
            <a
              href={`/${region}/auth/forget-password`}
              className="pasword-btn text-end col-md-6"
            >
              Forgotten password?
            </a>
          </div>
          <div className="form-submit">
            <button
              title="login"
              disabled={isSubmitting}
              type="submit"
              className="theme-btn"
            >
              Login{" "}
              <Image alt="" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
