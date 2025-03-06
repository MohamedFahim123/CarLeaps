import { CarDealerInterface } from "@/app/store/CarsForSale";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import DealerMainSection from "@/components/Homes/Dealer/DealerMainSection";
import { Metadata } from "next";
import { cookies } from "next/headers";

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

  return <DealerMainSection dealerItem={dealerData} />;
}
