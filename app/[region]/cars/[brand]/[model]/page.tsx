import ModelPageMain from "@/components/Homes/Model/ModelPageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Model Details",
};

export default async function ModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;

  return <ModelPageMain model={+model} />;
}
