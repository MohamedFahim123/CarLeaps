"use client";

import { useRouter } from "next/navigation";

export default function SetRegion() {
    const router = useRouter();

    const setRegion = (region: string) => {
        document.cookie = `region=${region}; path=/`;
        router.push(`/${region}/discover/home`);
    };

    return (
        <div>
            <h1>Select Your Region</h1>
            <button type="button" title='Riyadh' onClick={() => setRegion("Riyadh")}>Al Riyadh</button>
        </div>
    );
}
