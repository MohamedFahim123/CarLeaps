import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useConditionStore } from "@/app/store/conditions";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import type { CarSearchFilters } from "@/app/lib/cars/searchFilters";
import AppSelect from "@/components/Common/AppSelect";

interface FilterColProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  filters: CarSearchFilters;
  setFilter: (name: keyof CarSearchFilters, value: string) => void;
}

const FilterCol = ({
  isSidebarOpen,
  setIsSidebarOpen,
  filters,
  setFilter,
}: FilterColProps) => {
  const { condition } = useConditionStore();
  const { makes, models, boodies } = useCarsForSaleStore();
  const { fuelTypes } = useFuelTypesStore();

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
                <AppSelect
                  id="SearchCondition"
                  variant="ghostBorder"
                  value={filters.condition}
                  onChange={(value) => setFilter("condition", value)}
                  placeholder="Select Condition"
                  options={condition.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="categories-box">
                <div className="form_boxes">
                  <label htmlFor="SearchBody">Body Type</label>
                  <AppSelect
                    id="SearchBody"
                    variant="ghostBorder"
                    value={filters.body}
                    onChange={(value) => setFilter("body", value)}
                    placeholder="Select Body"
                    options={boodies.map((body) => ({
                      value: String(body.id),
                      label: body.name,
                    }))}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form_boxes">
                <label htmlFor="SearchMakes">Make</label>
                <AppSelect
                  id="SearchMakes"
                  variant="ghostBorder"
                  value={filters.make}
                  onChange={(value) => setFilter("make", value)}
                  placeholder="Select Make"
                  options={makes.map((make) => ({
                    value: String(make.id),
                    label: make.name,
                  }))}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="categories-box">
                <div className="form_boxes">
                  <label htmlFor="Searchmodels">model</label>
                  <AppSelect
                    id="Searchmodels"
                    variant="ghostBorder"
                    value={filters.model}
                    onChange={(value) => setFilter("model", value)}
                    placeholder="Select model"
                    options={models.map((model) => ({
                      value: String(model.id),
                      label: model.name,
                    }))}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form_boxes">
                <label htmlFor="Searchfuel_types">Fuel Type</label>
                <AppSelect
                  id="Searchfuel_types"
                  variant="ghostBorder"
                  value={filters.fuel_type}
                  onChange={(value) => setFilter("fuel_type", value)}
                  placeholder="Select fuel_type"
                  options={fuelTypes.map((fuel_type) => ({
                    value: String(fuel_type.id),
                    label: fuel_type.name,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCol;
