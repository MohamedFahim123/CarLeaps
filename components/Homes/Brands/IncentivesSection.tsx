"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Brands.module.css";
import { incentive } from "./Data";

export default function IncentivesSection({ incentives }: { incentives: incentive[] }) {
  return (
    <div className="container py-5">
      <h3 className="mb-4">Alfa Romeo Incentives</h3>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
      >
        {incentives.map((item, index) => (
          <SwiperSlide key={index} className={`py-3 ${styles.sliderSlide}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <span className={`badge bg-success mb-2 ${styles.sliderBadge}`}>{item.type}</span>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-dark">See details</button>
                  <span className="text-danger">Expires {item.expires}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
