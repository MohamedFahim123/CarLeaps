import ModelPageMainCom from "@/components/Homes/Model/ModelPageMainCom";
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

  return <ModelPageMainCom model={model} />;
}
