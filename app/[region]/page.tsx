import { redirect } from "next/navigation";
import NotFound from "../404";

export default async function RegionPage({ params }: { params: { region: string } }) {
    const { region } = params;

    const validRegions = ["Riyadh"];
    if (!validRegions.includes(region)) {
        NotFound();
    };

    redirect(`/${region}/discover/home`)
};