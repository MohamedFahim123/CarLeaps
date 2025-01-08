import MainAuthFormLayout from "@/components/Auth/MainAuthFormLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Create a new account for Valid Cars",
};

export default function page() {
    return (
        <MainAuthFormLayout currPage="register"/>
    );
};