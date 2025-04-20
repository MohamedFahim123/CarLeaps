"use client";
import { useCitiesStore } from "@/app/store/Cities";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { useResearchCarsAuthorizedStore } from "@/app/store/ResearchCarsAuthorized";
import Image from "next/image";
import Link from "next/link";

const icons: { icon: string }[] = [
  { icon: "flaticon-gasoline-pump" },
  { icon: "flaticon-speedometer" },
  { icon: "flaticon-gearbox" },
];

export default function Cars() {
  const { currRegion } = useResearchCarsMakesStore();
  const { researchCarsAuthorized } = useResearchCarsAuthorizedStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";

  return (
    <>
      {researchCarsAuthorized?.length > 0 && (
        <section className="cars-section-four bg-1">
          <div className="boxcar-container">
            <div className="boxcar-title wow fadeInUp">
              <h2 className="mb-5">
                Authorized New Cars Available Today In {currRegion}
              </h2>
              <Link href={`/`} className="btn-title">
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_601_243)">
                    <path
                      d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                      fill="#050B20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_601_243">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
            <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
              <div className="tab-pane fade show active">
                <div className="row">
                  {researchCarsAuthorized?.slice(0, 8).map((car, i) => (
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
                              {car.year ? car.year : ""}{" "}
                              {car.model ? car.model : ""}{" "}
                              {car.make ? car.make : ""}
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
                              <span className="fw-semibold d-inline fs-6">
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
