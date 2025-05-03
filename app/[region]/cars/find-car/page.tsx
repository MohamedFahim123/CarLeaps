import { useModelsStore } from "@/app/store/allModels";
import { useCitiesStore } from "@/app/store/Cities";
import { useMakesCarsStore } from "@/app/store/makeCars";
import { useTokenStore } from "@/app/store/Token";
import { useYearsStore } from "@/app/store/years";
import Loader from "@/components/Common/Loader";
import FindCarForm from "@/components/Homes/FindCar/FindCarForm";
import React, { Suspense } from "react";

const FindCarPage = () => {
  const { modelsLoading } = useModelsStore.getState();
  const { citiesLoading } = useCitiesStore.getState();
  const { makesCarsLoading } = useMakesCarsStore.getState();
  const { yearsLoading } = useYearsStore.getState();
  const { tokenLoading } = useTokenStore.getState();

  if (
    modelsLoading ||
    citiesLoading ||
    makesCarsLoading ||
    yearsLoading ||
    tokenLoading
  ) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className="boxcar-container py-5">
        <div className="row">
          <div className="col-lg-9">
            <h1 className="fw-semibold text-capitalize">
              Find the car you need
            </h1>
            <FindCarForm />
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </Suspense>
  );
};

export default React.memo(FindCarPage);
