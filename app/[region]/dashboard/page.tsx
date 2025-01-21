import { MainRegionName } from "@/app/utils/mainData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Welcome to your dashboard.',
};

export default async function DashbBoardPage() {
    const cookiesData = await cookies();
    const region: string = cookiesData.get('region')?.value || MainRegionName;

    return redirect(`/${region}/dashboard/profile`);
};