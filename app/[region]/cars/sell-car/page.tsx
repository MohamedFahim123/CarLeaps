import SellYourCarForm from "@/components/Homes/SellCar/SellYourCarForm";
import React from "react";

const SellYourCarPage = () => {
  return (
    <div className="boxcar-container py-5">
      <div className="row">
        <div className="col-lg-9">
          <h1 className="fw-semibold text-capitalize">Sell your car</h1>
          <SellYourCarForm />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default React.memo(SellYourCarPage);
