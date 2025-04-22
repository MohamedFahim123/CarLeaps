"use client";

import { useSearchCarsStore } from "@/app/store/carSearch";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterCol from "./FilterCol";
import { sideBarPropsInterface } from "./SearchMainPage";
import styles from "./searchedListingStyles.module.css";

export interface DefaultValues {
  condition: string;
  make: string;
  model: string;
  fuel_type: string;
  body: string;
  ad_state: string;
}
const icons: { icon: string }[] = [
  { icon: "flaticon-gasoline-pump" },
  { icon: "flaticon-speedometer" },
  { icon: "flaticon-gearbox" },
];

export default function SearchedListings({
  isSidebarOpen,
  setIsSidebarOpen,
}: sideBarPropsInterface) {
  const searchParams = useSearchParams();

  const currRegion: string = Cookies.get("region") || MainRegionName;
  const { currentRegion } = useCarsForSaleStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currentRegion)?.currency || "";

  const [defaultValues, setDefaultValues] = useState<DefaultValues>({
    condition: "",
    make: "",
    model: "",
    fuel_type: "",
    body: "",
    ad_state: "",
  });

  const { carsSearch, carsSearchLoading } = useSearchCarsStore();

  useEffect(() => {
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const condition = searchParams.get("condition");
    const fuel_type = searchParams.get("fuel_type");
    const body = searchParams.get("body");
    const ad_state = searchParams.get("ad_state");

    setDefaultValues({
      make: make || "",
      model: model || "",
      condition: condition || "",
      fuel_type: fuel_type || "",
      body: body || "",
      ad_state: ad_state || "",
    });

    useSearchCarsStore.getState().getCarsSearch({
      condition: condition || undefined,
      make: make || undefined,
      model: model || undefined,
      fuel_type: fuel_type || undefined,
      body: body || undefined,
      ad_state: ad_state || undefined,
    });
  }, [searchParams]);

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
          <FilterCol defaultValues={defaultValues} setDefaultValues={setDefaultValues} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box row">
              {carsSearchLoading ? (
                <p>Loading cars...</p>
              ) : carsSearch?.length > 0 ? (
                carsSearch?.map((car, i) => (
                  <div
                    key={i}
                    className={`${styles.car_card} box-car car-block-three col-lg-4 col-md-6 col-sm-12`}
                  >
                    <div className="inner-box mx-2">
                      <div className={`image-box`}>
                        <div className="image d-block">
                          <Link
                            href={`/${currentRegion}/cars/car-details/${car.name}`}
                          >
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
                          <Link
                            href={`/${currentRegion}/cars/car-details/${car.name}`}
                          >
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
                            href={`/${currentRegion}/cars/car-details/${car.name}`}
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
            {/* <div className="pagination-sec">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <Pagination />
                </ul>
                <div className="text">Showing results 1-30 of 1,415</div>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
