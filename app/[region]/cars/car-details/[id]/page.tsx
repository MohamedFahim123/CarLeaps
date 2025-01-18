import CarDetailsSection from "@/components/Homes/CarDetails/CarDetailsSection";
import { allCars } from "@/data/cars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Details",
  description: "",
};
export default function page({ params }: { params: { id: number } }) {
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];
  return <CarDetailsSection carItem={carItem}/>;
}
