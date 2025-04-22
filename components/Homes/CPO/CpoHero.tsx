"use client";

import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCPOCarsStore } from "@/app/store/CPOCars";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../Home/heroStyles.module.css";

interface SearchFormInputs {
  make: string;
  model: string;
}

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>();
  const { makes, models } = useCarsForSaleStore();
  const router = useRouter();
  const currRegion: string = Cookies.get("region") || MainRegionName;

  const onSubmit = (data: SearchFormInputs) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );

    const queryString = new URLSearchParams(filteredData).toString();

    router.push(
      `/${currRegion}/cars/cars-for-sale/search?ad_state=2&condition=used${
        queryString ? `&${queryString}` : ""
      }`
    );
  };

  return (
    <section className="boxcar-banner-section-v1 banner-style-three">
      <div className="banner-content-three">
        <div className="boxcar-container">
          <div className="banner-content">
            <span className="wow fadeInUp">
              Browse top-quality, dealer-certified pre-owned cars in {region}
            </span>
            <h2
              className={`${styles.banner_h2} wow fadeInUp`}
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
                    <form
                      className={`${styles.form_container}`}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className={`${styles.form_boxes}`}>
                        <select
                          className="form-select w-100"
                          defaultValue={""}
                          {...register("make")}
                          id="searchMake"
                        >
                          <option value="" disabled>
                            Select Make
                          </option>
                          {makes.map((make) => (
                            <option key={make.id} value={make.id}>
                              {make.name}
                            </option>
                          ))}
                        </select>
                        {errors.make && (
                          <div className="text-danger text-small">
                            {errors.make.message}
                          </div>
                        )}
                      </div>
                      <div className={`${styles.form_boxes}`}>
                        <select
                          className="form-select w-100"
                          defaultValue={""}
                          {...register("model")}
                          id="searchModels"
                        >
                          <option value="" disabled>
                            Select Model
                          </option>
                          {models?.map(
                            (model: { id: number; name: string }) => (
                              <option key={model.id} value={model.id}>
                                {model.name}
                              </option>
                            )
                          )}
                        </select>
                        {errors.model && (
                          <div className="text-danger text-small">
                            {errors.model.message}
                          </div>
                        )}
                      </div>
                      <div className={`form-submit ${styles.form_submit}`}>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="theme-btn"
                        >
                          <i className="flaticon-search" />
                          Search
                        </button>
                      </div>
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
