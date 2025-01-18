import CarDetailsSection from "@/components/Homes/CarDetails/CarDetailsSection";
import { allCars } from "@/data/cars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Details",
  description: "",
};

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const carItem = allCars?.find((elm) => +elm.id === +params.id) || allCars[0];

  return <CarDetailsSection carItem={carItem} />;
}
