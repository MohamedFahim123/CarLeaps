import FindCarForm from "@/components/Homes/FindCar/FindCarForm";
import React from "react";

const FindCarPage = () => {
  return (
    <div className="boxcar-container py-5">
      <div className="row">
        <div className="col-lg-9">
          <h1 className="fw-semibold text-capitalize">Find the car you need</h1>
          <FindCarForm />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default React.memo(FindCarPage);
