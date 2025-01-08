import { notFound, redirect } from "next/navigation";

export default async function RegionPage({ params }: { params: { region: string } }) {
    const { region } = await params;

    const validRegions = ["Riyadh"];

    if (!validRegions.includes(region)) {
        notFound();
    };

    redirect(`/${region}/discover/home`);

    return null;
};