import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const metadata: Metadata = {
    title: 'Select Your Current Region',
    description: 'Select your current region to get personalized recommendations and offers.',
};

export default async function MainHome() {
    const cookieStore = await cookies();
    const region: string | undefined = cookieStore.get('region')?.value;

    if (region) {
        return redirect(`/${region}`);
    } else {
        const headers = new Headers();
        headers.append('Set-Cookie', `region=riyadh; Path=/; Max-Age=${60 * 60}; Secure; HttpOnly`);

        return redirect(`/riyadh`);
    };
};
