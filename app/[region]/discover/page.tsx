import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DiscoverPage() {
    const cookiesData = await cookies();
    const region: string | undefined = cookiesData.get('region')?.value;

    return redirect(`/${region}/discover/home`);
};