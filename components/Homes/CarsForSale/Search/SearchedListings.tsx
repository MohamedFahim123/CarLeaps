"use client";

import { useSearchCarsStore } from "@/app/store/carSearch";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import { useConditionStore } from "@/app/store/conditions";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function SearchedListings() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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

  const { condition } = useConditionStore();
  const { makes, models, boodies } = useCarsForSaleStore();
  const { fuelTypes } = useFuelTypesStore();
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
          <h2>
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
          <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
            <div className="sidebar-handle">
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
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box row">
              {carsSearchLoading ? (
                <p>Loading cars...</p>
              ) : carsSearch?.length > 0 ? (
                carsSearch?.map((car, i) => (
                  <div
                    key={i}
                    className="box-car car-block-three col-lg-4 col-md-6 col-sm-12"
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
                        <Link
                          href={`/${currentRegion}/cars/car-details/${car.name}`}
                          title=""
                          className="icon-box"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_601_1274)">
                              <path
                                d="M9.39062 12C9.15156 12 8.91671 11.9312 8.71128 11.8009L6.11794 10.1543C6.04701 10.1091 5.95296 10.1096 5.88256 10.1543L3.28869 11.8009C2.8048 12.1082 2.13755 12.0368 1.72722 11.6454C1.47556 11.4047 1.33685 11.079 1.33685 10.728V1.2704C1.33738 0.570053 1.90743 0 2.60778 0H9.39272C10.0931 0 10.6631 0.570053 10.6631 1.2704V10.728C10.6631 11.4294 10.0925 12 9.39062 12ZM6.00025 9.06935C6.24193 9.06935 6.47783 9.13765 6.68169 9.26743L9.27503 10.9135C9.31233 10.9371 9.35069 10.9487 9.39114 10.9487C9.48046 10.9487 9.61286 10.8788 9.61286 10.728V1.2704C9.61233 1.14956 9.51356 1.05079 9.39272 1.05079H2.60778C2.48642 1.05079 2.38817 1.14956 2.38817 1.2704V10.728C2.38817 10.7911 2.41023 10.8436 2.45384 10.8851C2.52582 10.9539 2.63563 10.9708 2.72599 10.9135L5.31934 9.2669C5.52267 9.13765 5.75857 9.06935 6.00025 9.06935Z"
                                fill="black"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_601_1274">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      </div>
                      <div className="content-box">
                        <h6 className="title fw-bold text-capitalize fs-4 mb-2">
                          <Link
                            href={`/${currentRegion}/cars/car-details/${car.name}`}
                          >
                            {car.name.replaceAll("-", " ")}
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
