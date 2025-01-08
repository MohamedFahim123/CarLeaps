import { Metadata } from "next";
import SetRegion from "./setregion/page";
import { cookies } from "next/headers";
import RegionPage from "./[region]/page";

export const metaData: Metadata = {
    title: 'Select Your Current Region',
    description: 'Select your current region to get personalized recommendations and offers.',
};

export default async function MainHome() {
    const cookiesData = await cookies();
    const region: string | undefined = cookiesData.get('region')?.value;

    if (region) {
        return <RegionPage params={{region}} />
    } else {
        return <SetRegion />
    };
};
