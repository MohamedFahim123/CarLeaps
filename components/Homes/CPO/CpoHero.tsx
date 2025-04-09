"use client";

import SelectComponent from "@/components/Common/SelectComponent";
import Link from "next/link";
import Cookies from "js-cookie";
import { MainRegionName } from "@/app/utils/mainData";
import { useCPOCarsStore } from "@/app/store/CPOCars";
import { useCallback, useEffect } from "react";

export default function CpoHero() {
  const region = Cookies.get("region") || MainRegionName;
  const { CPOCars, getCPOCars, CPOCarsLoading } = useCPOCarsStore();

  const getAllCPOCars = useCallback(() => {
    if (!CPOCarsLoading || CPOCars.length === 0) {
      getCPOCars();
    }
  }, [CPOCars.length, CPOCarsLoading, getCPOCars]);

  useEffect(() => {
    getAllCPOCars();
  }, [getAllCPOCars]);

  return (
    <section className="boxcar-banner-section-v1 banner-style-three">
      <div className="banner-content-three">
        <div className="boxcar-container">
          <div className="banner-content">
            <span className="wow fadeInUp">
              Browse top-quality, dealer-certified pre-owned cars in {region}
            </span>
            <h2
              className="wow fadeInUp"
              style={{ lineHeight: "1.2" }}
              data-wow-delay="100ms"
            >
              Your Trusted CPO Awaits
            </h2>
            <div className="form-tabs">
              <div
                className="form-tab-content wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="form-tab-content">
                  <div className="form-tab-pane current" id="tab-1">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="form_boxes line-r">
                        <SelectComponent
                          options={["Any Makes", "Audi", "Honda"]}
                        />
                      </div>
                      <div className="form_boxes line-r">
                        <SelectComponent
                          options={["Any Models", "A3", "Accord"]}
                        />
                      </div>
                      <Link href={`/inventory-list-01`} className="form-submit">
                        <button type="submit" className="theme-btn">
                          <i className="flaticon-search" />
                          Search 9451 Cars
                        </button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
