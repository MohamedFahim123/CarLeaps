import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import Loader from "@/components/Common/Loader";
import DealerMainSection from "@/components/Homes/Dealer/DealerMainSection";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { CarDealerInterface } from "../../car-details/[id]/page";

export const metadata: Metadata = {
  title: "CarLeaps - Dealer Details",
};

export default async function DealerPage({
  params,
}: {
  params: Promise<{
    dealerId: string;
  }>;
}) {
  const { dealerId } = await params;
  const cookiesData = await cookies();
  const region = cookiesData.get("region")?.value || MainRegionName;

  const req = await fetch(`${baseUrl}/dealers/${dealerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      code: region,
    },
  });
  const respose = await req.json();
  const dealerData: CarDealerInterface = respose?.data;

  return (
    <Suspense fallback={<Loader />}>
      <DealerMainSection dealerItem={dealerData} />
    </Suspense>
  );
}
