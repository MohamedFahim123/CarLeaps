'use client';

import { notFound, redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function RegionPage() {
    const region = Cookies.get('region') || 'riyadh';

    const validRegions = ["Riyadh"];

    if (!validRegions.includes(region)) {
        notFound();
    };

    redirect(`/${region}/discover/home`);

    return null;
};