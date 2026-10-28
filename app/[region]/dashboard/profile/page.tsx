import ProfileMainPage from "@/components/DashBoard/ProfileMainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Profile",
  description: "Your Valid Cars Profile",
};

export default function ProfilePage() {
  return <ProfileMainPage />;
}
