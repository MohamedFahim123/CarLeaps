"use client";

import { useCountriesStore } from "@/app/store/countries";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Loader from "../Common/Loader";
import styles from "./authStyles.module.css";
import ForgetPasswordForm from "./ForgetPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function MainAuthFormLayout({ currPage }: { currPage: string }) {
  const [currRegion, setCurrRegion] = useState<string>(MainRegionName);
  const { countriesLoading } = useCountriesStore();

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);

  if (countriesLoading) return <Loader />;

  const isWide =
    currPage === "register" ||
    currPage === "forgetPassword" ||
    currPage === "resetPassword";

  return (
    <section className={`login-section layout-radius`}>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className={`auth-form ${styles.login_form_container} ${
              isWide ? "col-lg-6" : "col-lg-5"
            }`}
          >
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link
                  href={`/${currRegion}/auth/login`}
                  className={`nav-link ${currPage === "login" ? "active" : ""}`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign in
                </Link>
                <Link
                  href={`/${currRegion}/auth/register`}
                  className={`nav-link ${
                    currPage === "register" ? "active" : ""
                  }`}
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Register
                </Link>
                {(currPage === "forgetPassword" ||
                  currPage === "resetPassword") && (
                  <span
                    className={`nav-link active`}
                    id="nav-recover-tab"
                    role="tab"
                    aria-selected="true"
                  >
                    {currPage === "forgetPassword"
                      ? "Forgot Password"
                      : "Reset Password"}
                  </span>
                )}
              </div>
            </nav>
            <div className={`tab-content`} id="nav-tabContent">
              {currPage === "login" && <LoginForm />}
              {currPage === "register" && <RegisterForm />}
              {currPage === "forgetPassword" && <ForgetPasswordForm />}
              {currPage === "resetPassword" && (
                <Suspense fallback={<Loader />}>
                  <ResetPasswordForm />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
