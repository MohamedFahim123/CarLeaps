"use client";

import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const icons: { icon: string }[] = [
  { icon: "flaticon-gasoline-pump" },
  { icon: "flaticon-speedometer" },
  { icon: "flaticon-gearbox" },
];

export default function Cars() {
  const [mounted, setMounted] = useState(false);
  const { carsForSale, currentRegion } = useCarsForSaleStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currentRegion)?.currency || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="cars-section-three">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Explore All Vehicles</h2>
          <Link
            href={`/${currentRegion}/cars/cars-for-sale/search`}
            className="btn-title"
          >
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
        <div
          className="tab-content wow fadeInUp"
          data-wow-delay="200ms"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              breakpoints={{
                1600: { slidesPerView: 4.5, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 20 },
                991: { slidesPerView: 3, spaceBetween: 20 },
                767: { slidesPerView: 2, spaceBetween: 15 },
                480: { slidesPerView: 1, spaceBetween: 10 },
              }}
              modules={[Pagination, Autoplay]}
              className="car-slider-three slider-layout-1 row"
            >
              {carsForSale?.map((car, index) => (
                <SwiperSlide
                  key={index}
                  className="box-car car-block-three col-lg-3 col-md-6 col-sm-12"
                  style={{
                    margin: "0 10px",
                    boxSizing: "border-box",
                  }}
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
                      {car.status && <span>{car.status}</span>}
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
                              <rect width="12" height="12" fill="white"></rect>
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
                          <span className="fw-bold fs-6">{car?.dealer?.name}</span>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
