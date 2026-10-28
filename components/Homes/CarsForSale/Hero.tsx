"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { carSearchHref } from "@/app/lib/cars/searchFilters";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import AppSelect from "@/components/Common/AppSelect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./heroStyles.module.css";

interface VihicleTab {
  label: string;
  tab: string;
  isActive: boolean;
}

const vehicleTabs: VihicleTab[] = [
  { label: "Used", tab: "tab-2", isActive: true },
  { label: "New", tab: "tab-1", isActive: false },
];

interface SearchFormInputs {
  condition: string;
  make: string;
  model: string;
}

export default function Hero() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>({
    defaultValues: { condition: "", make: "", model: "" },
  });
  const router = useRouter();
  const currRegion = useRouteRegion();
  const [activeVehiclesTab, setactiveVehiclesTab] = useState<string>(
    vehicleTabs[0].label
  );
  const { makes, models } = useCarsForSaleStore();

  useEffect(() => {
    setValue("condition", activeVehiclesTab);
  }, [activeVehiclesTab, setValue]);

  const onSubmit = (data: SearchFormInputs) => {
    router.push(carSearchHref(currRegion, data));
  };

  return (
    <section className={`${styles.boxcar_banner_section_v8} boxcar-banner-section-v8`}>
      <div className="boxcar-container">
        <div className={`${styles.banner_content} banner-content-v8`}>
          <h2 className="wow fadeInUp">Let’s Find Your Perfect Car</h2>
          <div className={`${styles.form_tab_content} banner-v8-form wow fadeInUp`} data-wow-delay="200ms">
            <ul className={`${styles.form_tabs_list} form-tabs-list`}>
              {vehicleTabs.map(({ label, tab }) => (
                <li
                  key={tab}
                  onClick={() => {
                    setactiveVehiclesTab(label);
                  }}
                  className={activeVehiclesTab == label ? "current" : ""}
                  data-tab={tab}
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className={`form-tab-content`}>
              <div className="form-tab-pane current" id="tab-1">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={`${styles.form_boxes}`}>
                    <Controller
                      name="make"
                      control={control}
                      render={({ field }) => (
                        <AppSelect
                          id="searchMake"
                          variant="ghostBorder"
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
                          variant="ghostBorder"
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

                  <div className={`${styles.form_submit} form-submit`}>
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
    </section>
  );
}
