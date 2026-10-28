"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { carDetailsHref } from "@/app/lib/cars/paths";
import type { CarSearchFilters } from "@/app/lib/cars/searchFilters";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { Car } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import Loader from "@/components/Common/Loader";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import FilterCol from "./FilterCol";
import styles from "./searchedListingStyles.module.css";
import { sideBarPropsInterface } from "./SearchMainPage";

const icons: { icon: string }[] = [
  { icon: "flaticon-gasoline-pump" },
  { icon: "flaticon-speedometer" },
  { icon: "flaticon-gearbox" },
];

type SearchedListingsProps = sideBarPropsInterface & {
  filters: CarSearchFilters;
  setFilter: (name: keyof CarSearchFilters, value: string) => void;
  carsSearch: Car[];
  carsSearchLoading: boolean;
};

export default function SearchedListings({
  isSidebarOpen,
  setIsSidebarOpen,
  filters,
  setFilter,
  carsSearch,
  carsSearchLoading,
}: SearchedListingsProps) {
  const currRegion = useRouteRegion();
  const { currentRegion } = useCarsForSaleStore();
  const { cities } = useCitiesStore();

  const currentCurrency = useMemo(
    () => cities.find((city) => city.code === currentRegion)?.currency || "",
    [cities, currentRegion]
  );

  return (
    <section className="cars-section-thirteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <Link href={`/${currRegion}/cars/cars-for-sale`}>
                Cars for Sale
              </Link>
            </li>
          </ul>
          <h2 className={styles.title}>
            What Kind of Car Should I Get? Try CarLeaps{" "}
            <Link
              className="linkPerfectMatch"
              href={`/${currRegion}/cars/perfect-match`}
            >
              Perfect Match
            </Link>
          </h2>
        </div>
        <div className="row">
          <FilterCol
            filters={filters}
            setFilter={setFilter}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box row">
              {carsSearchLoading ? (
                <Loader />
              ) : carsSearch?.length > 0 ? (
                carsSearch?.map((car, i) => (
                  <div
                    key={car.id ?? i}
                    className={`${styles.car_card} box-car car-block-three col-lg-4 col-md-6 col-sm-12`}
                  >
                    <div className="inner-box mx-2">
                      <div className={`image-box`}>
                        <div className="image d-block">
                          <Link href={carDetailsHref(currentRegion, car)}>
                            <Image
                              alt={car.name}
                              src={car.main_image}
                              width={329}
                              height={220}
                            />
                          </Link>
                        </div>
                        {car.ad_state !== "N/A" &&
                          (car?.ad_state === "CPO" ||
                            car?.ad_state === "Authorized New") && (
                            <span>{car.ad_state}</span>
                          )}
                      </div>
                      <div className="content-box">
                        <h6 className="title fw-bold text-capitalize fs-4 mb-2">
                          <Link href={carDetailsHref(currentRegion, car)}>
                            {car?.year !== "N/A" ? car?.year : ""}{" "}
                            {car.make ? car.make : ""}{" "}
                            {car.model ? car.model : ""}
                          </Link>
                        </h6>
                        <div className="text">
                          {car?.description.slice(0, 30)}...
                        </div>
                        <ul className="d-flex justify-content-between">
                          <li>
                            <i className={`${icons[0].icon}`} />
                            {car.fuel_type}
                          </li>
                          <li>
                            <i className={`${icons[1].icon}`} />
                            {car.mileage}
                          </li>
                          <li>
                            <i className={`${icons[2].icon}`} />
                            {car.transmission}
                          </li>
                        </ul>
                        <ul className="d-flex gap-3">
                          <li
                            style={{ height: "50px", width: "50px", margin: 0 }}
                          >
                            <Image
                              src={car?.dealer?.image}
                              width={25}
                              height={25}
                              alt={car?.dealer?.name}
                              className="rounded-circle object-fit-contain w-100 h-100 mb-0"
                            />
                          </li>
                          <li className="d-flex flex-column justify-content-between align-items-start">
                            <span>Sold By</span>
                            <span className="fw-bold fs-6">
                              {car?.dealer?.name}
                            </span>
                          </li>
                        </ul>
                        <div className="btn-box">
                          {car?.offer_price && (
                            <span>
                              <del>
                                {car.price} {currentCurrency}
                              </del>
                            </span>
                          )}
                          <small>
                            {car.offer_price ? car.offer_price : car.price}{" "}
                            {currentCurrency}
                          </small>
                          <Link
                            href={carDetailsHref(currentRegion, car)}
                            className="details"
                            title="Car Details"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  <h2>No Cars Match your Search</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
