import { notFound, redirect } from "next/navigation";

export default function RegionPage({ params }: { params: { region: string } }) {
    const { region } = params;

    const validRegions = ["Riyadh"];

    if (!validRegions.includes(region)) {
        notFound();
    };

    redirect(`/${region}/discover/home`);

    return null;
};