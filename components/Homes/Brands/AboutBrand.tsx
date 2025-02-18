"use client";

import { MakesCars } from "@/app/store/makeCars";
import styles from "./Brands.module.css";

export default function AboutBrand({ brand }:{brand: MakesCars}) {
  return (
    <div className={`${styles.bgBlack} text-white py-5`}>
      <div className="container">
        <p className="text-light">About {brand.name}</p>
        <h2 className="text-light mb-4">
          Master the road with driving pleasure
        </h2>
        {/* <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
          }}
          loop={true}
          spaceBetween={30}
          className="features-slider"
        >
          {brand.features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-dark text-white border-0 h-auto mb-4 shadow-none">
                <Image
                  src={feature.image}
                  className="card-img-top"
                  alt={feature.title}
                  width={300}
                  height={100}
                />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-light">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-light me-3">Build & price →</button>
          <button className="btn btn-outline-light">Learn more →</button>
        </div>
      </div>
    </div>
  );
}
