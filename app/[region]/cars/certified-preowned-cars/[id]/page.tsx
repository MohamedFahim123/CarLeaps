import CPODetailsMainPage from "@/components/Homes/CPO/CPODetailsMainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarLeaps - Certified PreOwned Car Details",
};

const CPOPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  return <CPODetailsMainPage brandId={+id} />;
};

export default CPOPage;
