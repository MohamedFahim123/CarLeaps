import { isMockMode } from "@/app/lib/config/dataMode";
import { handleMockFetch } from "@/app/lib/mock/handlers";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import Loader from "@/components/Common/Loader";
import DealerMainSection from "@/components/Homes/Dealer/DealerMainSection";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
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

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    code: region,
  };
  const req = isMockMode()
    ? await handleMockFetch(`${baseUrl}/dealers/${dealerId}`, {
        method: "GET",
        headers,
      })
    : await fetch(`${baseUrl}/dealers/${dealerId}`, {
        method: "GET",
        headers,
      });
  const respose = await req.json();
  const dealerData: CarDealerInterface | undefined = respose?.data;

  if (!req.ok || !dealerData) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <DealerMainSection dealerItem={dealerData} />
    </Suspense>
  );
}
