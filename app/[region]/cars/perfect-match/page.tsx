import { useBodiesStore } from "@/app/store/bodies";
import { useInterestsStore } from "@/app/store/Interest";
import Loader from "@/components/Common/Loader";
import ShopList from "@/components/Homes/PerfectMatch/ShopList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CarLeaps - Perfect Match",
  description: "Your perfect match for your car",
  keywords: ["perfect match", "CarLeaps", "car search"],
};

export default function PerfectMatchPage() {
  const { bodiesLoading } = useBodiesStore.getState();
  const { interestsLoading } = useInterestsStore.getState();

  if (bodiesLoading || interestsLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ShopList />
    </Suspense>
  );
}
