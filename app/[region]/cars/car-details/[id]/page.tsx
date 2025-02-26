import { Car } from "@/app/store/CarsForSale";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import CarDetailsSection from "@/components/Homes/CarDetails/CarDetailsSection";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CarLeaps - Car Details",
  description: "",
};

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookiesData = await cookies();
  const region = cookiesData.get("region")?.value || MainRegionName;
  const resolvedParams = await params;
  const reqBody: { slug: string } = {
    slug: resolvedParams.id,
  };
  const carItemReq = await fetch(`${baseUrl}/car/show`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      code: region
    },
    body: JSON.stringify(reqBody),
  });
  const responseJson = await carItemReq.json();
  const carItem: Car = responseJson?.data;

  return <CarDetailsSection region={region} carItem={carItem} />;
}
