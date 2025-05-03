"use client";
import { useSearchCarsStore } from "@/app/store/carSearch";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useConditionStore } from "@/app/store/conditions";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DefaultValues } from "./SearchedListings";
import { sideBarPropsInterface } from "./SearchMainPage";

export default function SidebarSearch({
  isSidebarOpen,
  setIsSidebarOpen,
}: sideBarPropsInterface) {
  const [defaultValues, setDefaultValues] = useState<DefaultValues>({
    condition: "",
    make: "",
    model: "",
    fuel_type: "",
    body: "",
    ad_state: "",
  });
  const router = useRouter();
  const pathname = usePathname();
  const { condition } = useConditionStore();
  const { fuelTypes } = useFuelTypesStore();
  const { makes, models, boodies } = useCarsForSaleStore();
  const { getCarsSearch } = useSearchCarsStore();

  const searchParams = useSearchParams();
  const searchValues = useMemo(() => {
    const make = searchParams.get("make") || "";
    const model = searchParams.get("model") || "";
    const condition = searchParams.get("condition") || "";
    const fuel_type = searchParams.get("fuel_type") || "";
    const body = searchParams.get("body") || "";
    const ad_state = searchParams.get("ad_state") || "";

    return {
      make,
      model,
      condition,
      fuel_type,
      body,
      ad_state,
    };
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      await getCarsSearch({
        ...searchValues,
        condition: searchValues.condition || undefined,
        make: searchValues.make || undefined,
        model: searchValues.model || undefined,
        fuel_type: searchValues.fuel_type || undefined,
        body: searchValues.body || undefined,
        ad_state: searchValues.ad_state || undefined,
      });
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [getCarsSearch, searchValues]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setDefaultValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className={`wrap-fixed-sidebar ${isSidebarOpen ? "active" : ""}`}>
      <div className="sidebar-backdrop" />
      <div className="widget-sidebar-filter">
        <div className="fixed-sidebar-title">
          <h3>More Filter</h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="close-filters"
          >
            <Image
              alt="Close"
              src="/images/icons/close.svg"
              width={30}
              height={30}
            />
          </button>
        </div>
        <div className="inventory-sidebar">
          <div className="inventroy-widget widget-location">
            <div className="row">
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label htmlFor="SearchCondition">Condition</label>
                  <select
                    value={defaultValues.condition}
                    className="form-select"
                    name="condition"
                    onChange={handleChange}
                    id="SearchCondition"
                  >
                    <option value="" disabled>
                      Select Condition
                    </option>
                    {condition.map((item: string, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="categories-box">
                  <div className="form_boxes">
                    <label htmlFor="SearchBody">Body Type</label>
                    <select
                      value={defaultValues.body}
                      className="form-select"
                      name="body"
                      onChange={handleChange}
                      id="SearchBody"
                    >
                      <option value="" disabled>
                        Select Body
                      </option>
                      {boodies.map((body) => (
                        <option key={body.id} value={body.id}>
                          {body.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label htmlFor="SearchMakes">Make</label>
                  <select
                    value={defaultValues.make}
                    className="form-select"
                    name="make"
                    onChange={handleChange}
                    id="SearchMakes"
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
                </div>
              </div>
              <div className="col-lg-12">
                <div className="categories-box">
                  <div className="form_boxes">
                    <label htmlFor="Searchmodels">model</label>
                    <select
                      value={defaultValues.model}
                      className="form-select"
                      name="model"
                      onChange={handleChange}
                      id="Searchmodels"
                    >
                      <option value="" disabled>
                        Select model
                      </option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label htmlFor="Searchfuel_types">Fuel Type</label>
                  <select
                    value={defaultValues.fuel_type}
                    className="form-select"
                    name="fuel_type"
                    onChange={handleChange}
                    id="Searchfuel_types"
                  >
                    <option value="" disabled>
                      Select fuel_type
                    </option>
                    {fuelTypes.map((fuel_type) => (
                      <option key={fuel_type.id} value={fuel_type.id}>
                        {fuel_type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
