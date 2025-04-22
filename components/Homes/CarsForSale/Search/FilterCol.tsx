import React from "react";
import { useConditionStore } from "@/app/store/conditions";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { DefaultValues } from "./SearchedListings";

interface FilterColProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  defaultValues: DefaultValues;
  setDefaultValues: (defaultValues: DefaultValues) => void;
}

const FilterCol = ({
  isSidebarOpen,
  setIsSidebarOpen,
  defaultValues,
  setDefaultValues,
}: FilterColProps) => {
  const { condition } = useConditionStore();
  const { makes, models, boodies } = useCarsForSaleStore();
  const { fuelTypes } = useFuelTypesStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setDefaultValues({
      ...defaultValues,
      [name]: value,
    });

    const newParams = new URLSearchParams(window.location.search);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
      <div
        className="sidebar-handle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
            fill="#050B20"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
            fill="#050B20"
          />
        </svg>
        Show Filter
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
  );
};

export default FilterCol;
