import { CarFeatures } from "@/app/store/CarsForSale";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import CarDetailsSection from "@/components/Homes/CarDetails/CarDetailsSection";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CarLeaps - Car Details",
  description: "",
};

export interface CarDealerInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  address: string;
  sales_hours: string;
  status: string;
  type: string;
  country_id: number;
  country_name: string;
  locale: string;
  cover: string;
  image: string;
  documents: string[];
  cars: Car[];
}

export interface Car {
  id: number;
  name: string;
  condition: string;
  dealer: CarDealerInterface;
  body: string;
  make: string;
  model: string;
  trim: string;
  transmission: string;
  year: string;
  country: string;
  city: string;
  body_id: number;
  make_id: number;
  model_id: number;
  trim_id: number;
  transmission_id: number;
  year_id: number;
  country_id: number;
  city_id: number;
  price: number;
  currency: string;
  offer_price: number;
  mileage: number;
  drive_type: string;
  exterior: string;
  interior: string;
  vin: string;
  engine: string;
  fuel_type: string;
  ad_state: string;
  added_at: string;
  description: string;
  video_link: string;
  status: string;
  main_image: string;
  history: string;
  lat: number;
  lng: number;
  features: CarFeatures[];
  carImagesCount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  carImages: { image: string }[];
}

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
      code: region,
    },
    body: JSON.stringify(reqBody),
  });
  const responseJson = await carItemReq.json();
  const carItem: Car = responseJson?.data?.car;
  const relatedCars : Car[] = responseJson?.data?.related_cars;

  return <CarDetailsSection region={region} carItem={carItem} relatedCars={relatedCars} />;
}
