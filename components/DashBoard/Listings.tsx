"use client";

import { CarsTypes, useActiveCars } from "@/app/store/activecars";
import { useState } from "react";
import ActiveCars from "./ActiveCars";
import DeactiveCars from "./DeactiveCars";
import PendingCars from "./PendingCars";
import Sidebar from "./Sidebar";
import { usePendingCars } from "@/app/store/pendingCars";
import { useDeactiveCars } from "@/app/store/deactiveCars";
import { useCitiesStore } from "@/app/store/Cities";
import Cookies from "js-cookie";

export default function Listings() {
  const [tab, setTab] = useState<string>("active_cars");
  const { activeCars } = useActiveCars();
  const { pendingCars } = usePendingCars();
  const { deactiveCars } = useDeactiveCars();

  const cars: CarsTypes[] = activeCars?.cars || [];
  const pending_Cars: CarsTypes[] = pendingCars?.cars || [];
  const deactive_Cars: CarsTypes[] = deactiveCars?.cars || [];
  const currentRegion = Cookies.get("region");
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currentRegion)?.currency || "";

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">My Listings</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="my-listing-table wrap-listing">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tab === "active_cars" ? "active" : ""
                    } `}
                    type="button"
                    onClick={() => handleTabChange("active_cars")}
                  >
                    Active Cars
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tab === "pending_cars" ? "active" : ""
                    } `}
                    type="button"
                    onClick={() => handleTabChange("pending_cars")}
                  >
                    Pending Cars
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tab === "deactive_cars" ? "active" : ""
                    } `}
                    type="button"
                    onClick={() => handleTabChange("deactive_cars")}
                  >
                    Deactive Cars
                  </button>
                </li>
              </ul>
              <div className="cart-table">
                {tab === "active_cars" && (
                  <ActiveCars currentCurrency={currentCurrency} cars={cars} />
                )}
                {tab === "pending_cars" && <PendingCars currentCurrency={currentCurrency} cars={pending_Cars} />}
                {tab === "deactive_cars" && (
                  <DeactiveCars currentCurrency={currentCurrency} cars={deactive_Cars} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
