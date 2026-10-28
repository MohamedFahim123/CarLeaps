import { useModelsStore } from "@/app/store/allModels";
import { useCitiesStore } from "@/app/store/Cities";
import { useMakesCarsStore } from "@/app/store/makeCars";
import { useTokenStore } from "@/app/store/Token";
import { useYearsStore } from "@/app/store/years";
import Loader from "@/components/Common/Loader";
import SellYourCarForm from "@/components/Homes/SellCar/SellYourCarForm";
import React, { Suspense } from "react";

const SellYourCarPage = () => {
  const { makesCarsLoading } = useMakesCarsStore.getState();
  const { citiesLoading } = useCitiesStore.getState();
  const { yearsLoading } = useYearsStore.getState();
  const { tokenLoading } = useTokenStore.getState();
  const { modelsLoading } = useModelsStore.getState();

  if (
    makesCarsLoading ||
    citiesLoading ||
    yearsLoading ||
    modelsLoading ||
    tokenLoading
  ) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className="boxcar-container py-5">
        <div className="row">
          <div className="col-lg-9">
            <h1 className="fw-semibold text-capitalize">Sell your car</h1>
            <SellYourCarForm />
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </Suspense>
  );
};

export default React.memo(SellYourCarPage);
