"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { carSearchHref } from "@/app/lib/cars/searchFilters";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCPOCarsStore } from "@/app/store/CPOCars";
import AppSelect from "@/components/Common/AppSelect";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../Home/heroStyles.module.css";

interface SearchFormInputs {
  make: string;
  model: string;
}

export default function CpoHero() {
  const region = useRouteRegion();
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
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>({
    defaultValues: { make: "", model: "" },
  });
  const { makes, models } = useCarsForSaleStore();
  const router = useRouter();
  const currRegion = region;

  const onSubmit = (data: SearchFormInputs) => {
    router.push(
      carSearchHref(currRegion, {
        ...data,
        condition: "Certified",
      })
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
                        <Controller
                          name="make"
                          control={control}
                          render={({ field }) => (
                            <AppSelect
                              id="searchMake"
                              variant="compact"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select Make"
                              options={makes.map((make) => ({
                                value: String(make.id),
                                label: make.name,
                              }))}
                            />
                          )}
                        />
                        {errors.make && (
                          <div className="text-danger text-small">
                            {errors.make.message}
                          </div>
                        )}
                      </div>
                      <div className={`${styles.form_boxes}`}>
                        <Controller
                          name="model"
                          control={control}
                          render={({ field }) => (
                            <AppSelect
                              id="searchModels"
                              variant="compact"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select Model"
                              options={(models || []).map(
                                (model: { id: number; name: string }) => ({
                                  value: String(model.id),
                                  label: model.name,
                                })
                              )}
                            />
                          )}
                        />
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
