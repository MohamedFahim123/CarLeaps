
import MainAuthFormLayout from "@/components/Auth/MainAuthFormLayout";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <MainAuthFormLayout currPage="login" />
    );
}
