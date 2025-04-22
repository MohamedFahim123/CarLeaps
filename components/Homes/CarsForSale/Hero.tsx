"use client";

import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>();
  const router = useRouter();
  const currRegion: string = Cookies.get("region") || MainRegionName;
  const [activeVehiclesTab, setactiveVehiclesTab] = useState<string>(
    vehicleTabs[0].label
  );
  const { makes, models } = useCarsForSaleStore();

  useEffect(() => {
    setValue("condition", activeVehiclesTab.toLowerCase());
  }, [activeVehiclesTab, setValue]);

  const onSubmit = (data: SearchFormInputs) => {
    const newData = { ...data, condition: data.condition.toLowerCase() };

    const filteredData = Object.fromEntries(
      Object.entries(newData).filter(([, value]) => value !== "")
    );

    const queryString = new URLSearchParams(filteredData).toString();

    router.push(
      `/${currRegion}/cars/cars-for-sale/search${
        queryString ? `?${queryString}` : ""
      }`
    );
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
                  <div className={`${styles.form_boxes} border border-1 rounded`}>
                    <select
                      className="form-select"
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
                  <div className={`${styles.form_boxes} border border-1 rounded`}>
                    <select
                      className="form-select"
                      defaultValue={""}
                      {...register("model")}
                      id="searchModels"
                    >
                      <option value="" disabled>
                        Select Model
                      </option>
                      {models?.map((model: { id: number; name: string }) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
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
