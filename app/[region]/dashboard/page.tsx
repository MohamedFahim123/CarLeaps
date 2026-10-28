import { Metadata } from "next";
import ProfilePage from "./profile/page";

export const metadata: Metadata = {
  title: "CarLeaps - Dashboard",
  description: "Welcome to your dashboard.",
};

export default async function DashbBoardPage() {

  return <ProfilePage />;
}
