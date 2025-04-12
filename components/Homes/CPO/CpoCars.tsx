"use client";
import { useCitiesStore } from "@/app/store/Cities";
import { CPOCarsInterface, useCPOCarsStore } from "@/app/store/CPOCars";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const icons: { icon: string }[] = [
  { icon: "flaticon-gasoline-pump" },
  { icon: "flaticon-speedometer" },
  { icon: "flaticon-gearbox" },
];

export default function CpoCars() {
  const { currRegion } = useResearchCarsMakesStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";
  const { CPOCars } = useCPOCarsStore();
  const [selectedBody, setSelectedBody] = useState<CPOCarsInterface>(
    CPOCars[0]
  );

  useEffect(() => {
    if (CPOCars?.length > 0) {
      setSelectedBody(CPOCars[0]);
    }
  }, [CPOCars]);

  return (
    <>
      {CPOCars?.length > 0 && (
        <section className="cars-section-four section-tab-car">
          <div className="boxcar-container">
            <div className="nav nav-tabs nav-car-tab">
              {CPOCars.map((elm) => (
                <button
                  type="button"
                  key={elm.body_id}
                  onClick={() => setSelectedBody(elm)}
                  className={`nav-link ${
                    selectedBody?.body_name == elm?.body_name ? "active" : ""
                  }`}
                >
                  <span>{elm.body_name}</span>
                </button>
              ))}
            </div>
            <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
              <div
                className="tab-pane fade show active"
                id="suv"
                role="tabpanel"
                aria-labelledby="suv-tab"
              >
                <div className="boxcar-title">
                  <h2>The Most Searched {selectedBody?.body_name} Cars</h2>
                </div>
                <div className="row">

                  {selectedBody?.cars?.map((car, i) => (
                    <div
                      key={i}
                      className="box-car car-block-three col-lg-3 col-md-6 col-sm-12"
                    >
                      <div className="inner-box mx-2 shadow-lg rounded-4">
                        <div className={`image-box`}>
                          <div className="image d-block">
                            <Link
                              href={`/${currRegion}/cars/car-details/${car.name}`}
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
                            href={`/${currRegion}/cars/car-details/${car.name}`}
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
                        <div className="content-box border-0">
                          <h6 className="title fw-bold text-capitalize fs-4 mb-2">
                            <Link
                              href={`/${currRegion}/cars/car-details/${car.name}`}
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
                              style={{
                                height: "50px",
                                width: "50px",
                                margin: 0,
                              }}
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
                              href={`/${currRegion}/cars/car-details/${car.name}`}
                              className="details"
                              title="Car Details"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
