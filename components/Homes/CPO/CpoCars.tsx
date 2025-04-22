"use client";
import { useCitiesStore } from "@/app/store/Cities";
import { CPOCarsInterface, useCPOCarsStore } from "@/app/store/CPOCars";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles2 from "../Home/heroStyles.module.css";
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
            <div className="nav nav-tabs nav-car-tab gap-0 mb-5">
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
                  <h2 className={`${styles2.boxcar_title} fw-semibold`}>The Most Searched {selectedBody?.body_name} Cars</h2>
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
                        </div>
                        <div className="content-box border-0">
                          <h6 className="title fw-bold text-capitalize fs-4 mb-2">
                            <Link
                              href={`/${currRegion}/cars/car-details/${car.name}`}
                            >
                              {car.year !== "N/A" ? car.year : ""}{" "}
                              {car.make !== "N/A" ? car.make : ""}{" "}
                              {car.model !== "N/A" ? car.model : ""}
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
                                  {currentCurrency}
                                  {car.price}
                                </del>
                              </span>
                            )}
                            <small>
                              <span className="d-inline fw-semibold fs-6">
                                {currentCurrency}
                              </span>
                              {car.offer_price ? car.offer_price : car.price}{" "}
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
