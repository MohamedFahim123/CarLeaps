import MainAuthFormLayout from "@/components/Auth/MainAuthFormLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Forget Password",
  description: "Forget Your Account Password - Valid Cars",
};

export default function ForgetPasswordPage() {
  return <MainAuthFormLayout currPage="forgetPassword" />;
}
