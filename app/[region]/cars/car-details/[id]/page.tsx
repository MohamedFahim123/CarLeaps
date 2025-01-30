import CarDetailsSection from "@/components/Homes/CarDetails/CarDetailsSection";
import { allCars } from "@/data/cars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Car Details",
  description: "",
};

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const carItem =
    allCars?.find((elm) => +elm.id === +resolvedParams.id) || allCars[0];

  return <CarDetailsSection carItem={carItem} />;
}
