"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Brands.module.css";
import { ResearchCarsMakes } from "@/app/store/ResearchCarMakes";

export default function AboutBrand({
  brand,
  currRegion,
}: {
  currRegion: string;
  brand: ResearchCarsMakes;
}) {
  return (
    <div className={`${styles.bgBlack} text-white py-5`}>
      <div className="container">
        <p className="text-light">Authorized Dealers</p>
        <h2 className="text-light mb-4">
          {brand.name} Authorized Dealers in {currRegion}
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 3.5 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
          }}
          loop={true}
          spaceBetween={30}
          className="features-slider"
        >
          {brand.dealers.map((dealer) => (
            <SwiperSlide key={dealer.dealer.id}>
              <div className="card border-0 h-auto mb-4 shadow-none">
                {dealer.dealer.cover !== "N/A" ? (
                  <Image
                    src={dealer.dealer.cover}
                    className="card-img-top"
                    alt={dealer.dealer.name}
                    width={300}
                    height={100}
                    style={{ objectFit: "contain", height: "300px" }}
                  />
                ) : (
                  <Image
                    src={dealer.dealer.image}
                    className="card-img-top"
                    alt={dealer.dealer.name}
                    width={300}
                    height={100}
                    style={{ objectFit: "contain", height: "300px" }}
                  />
                )}
                <div className="card-body">
                  {dealer.dealer.cover !== "N/A" &&
                    dealer.dealer.image !== "N/A" && (
                      <Image
                        src={dealer.dealer.image}
                        alt={dealer.dealer.name + " cover"}
                        width={100}
                        height={100}
                        className={"rounded-circle"}
                      />
                    )}
                  <h5 className="card-title text-dark">{dealer.dealer.name}</h5>
                  <p className="card-text text-dark">{dealer.dealer.bio}</p>
                  <Link
                    href={`/${currRegion}/cars/dealer/${dealer.dealer.id}`}
                    className="btn btn-outline-dark text-capitalize"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
