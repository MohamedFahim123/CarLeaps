"use client";

import { MainRegionName } from "@/app/utils/mainData";
import SelectComponent from "@/components/Common/SelectComponent";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";

interface VihicleTab {
  label: string;
  tab: string;
  isActive: boolean;
}

const vehicleTabs: VihicleTab[] = [
  { label: "New", tab: "tab-1", isActive: true },
  { label: "Used", tab: "tab-2", isActive: false },
];

export default function Hero() {
  const currRegion: string = Cookies.get("region") || MainRegionName;
  const [activeVehiclesTab, setactiveVehiclesTab] = useState<string>(
    vehicleTabs[0].label
  );

  return (
    <section className="boxcar-banner-section-v8">
      <div className="boxcar-container">
        <div className="banner-content-v8">
          <h2 className="wow fadeInUp">Let’s Find Your Perfect Car</h2>
          <div className="banner-v8-form wow fadeInUp" data-wow-delay="200ms">
            <ul className="form-tabs-list">
              {vehicleTabs.map(({ label, tab }) => (
                <li
                  key={tab}
                  onClick={() => setactiveVehiclesTab(label)}
                  className={activeVehiclesTab == label ? "current" : ""}
                  data-tab={tab}
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className="form-tab-content">
              <div className="form-tab-pane current" id="tab-1">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
                  </div>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Models", "A3", "Accord"]} />
                  </div>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Price", "200$", "300$"]} />
                  </div>
                  <Link
                    href={`/${currRegion}/cars/cars-for-sale/search`}
                    className="form-submit"
                  >
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
    </section>
  );
}
