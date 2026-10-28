"use client";

import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useConditionStore } from "@/app/store/conditions";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import type { CarSearchFilters } from "@/app/lib/cars/searchFilters";
import AppSelect from "@/components/Common/AppSelect";
import Image from "next/image";
import { sideBarPropsInterface } from "./SearchMainPage";

type SidebarSearchProps = sideBarPropsInterface & {
  filters: CarSearchFilters;
  setFilter: (name: keyof CarSearchFilters, value: string) => void;
};

export default function SidebarSearch({
  isSidebarOpen,
  setIsSidebarOpen,
  filters,
  setFilter,
}: SidebarSearchProps) {
  const { condition } = useConditionStore();
  const { fuelTypes } = useFuelTypesStore();
  const { makes, models, boodies } = useCarsForSaleStore();

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
                  <label htmlFor="MobileSearchCondition">Condition</label>
                  <AppSelect
                    id="MobileSearchCondition"
                    variant="ghostBorder"
                    value={filters.condition}
                    onChange={(value) => setFilter("condition", value)}
                    placeholder="Select Condition"
                    options={condition.map((item: string) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="categories-box">
                  <div className="form_boxes">
                    <label htmlFor="MobileSearchBody">Body Type</label>
                    <AppSelect
                      id="MobileSearchBody"
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
                  <label htmlFor="MobileSearchMakes">Make</label>
                  <AppSelect
                    id="MobileSearchMakes"
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
                    <label htmlFor="MobileSearchmodels">model</label>
                    <AppSelect
                      id="MobileSearchmodels"
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
                  <label htmlFor="MobileSearchfuel_types">Fuel Type</label>
                  <AppSelect
                    id="MobileSearchfuel_types"
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
    </div>
  );
}
