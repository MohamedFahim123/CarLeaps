"use client";

import { ResearchCarsMakes } from "@/app/store/ResearchCarMakes";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Brands.module.css";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Autoplay } from "swiper/modules";

const buttons: { label: string; isActive: boolean }[] = [
  { label: "All Models", isActive: true },
  { label: "SUV", isActive: false },
  { label: "Sedans", isActive: false },
];

export default function BrandsBanner({ brand }: { brand: ResearchCarsMakes }) {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const router = useRouter();
  const region: string = Cookies.get("region") || MainRegionName;

  return (
    <div className={styles.brandsBannerSection}>
      <div className="boxcar-container">
        <div className={`${styles.brandsBannerHead}`}>
          <p>Explore the full range</p>
          <h3>
            Find the {brand.name} that{"'"}s right for you
          </h3>
          <nav className="wow fadeInUp" data-wow-delay="100ms">
            <div className="nav nav-tabs">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(button)}
                  className={`nav-link ${
                    selectedCategory == button ? "active" : ""
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
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
          {brand.models &&
            brand.models?.length > 0 &&
            brand?.models.map((car) => (
              <SwiperSlide key={car.id}>
                <div className={`brand-block ${styles.brandBlock}`}>
                  <Link href={`/${region}/cars/car-details/${car.id}`}>
                    <Image
                      alt={`${car.name} Image`}
                      src={car.image}
                      width={300}
                      height={100}
                    />
                  </Link>
                  <h4
                    onClick={() =>
                      router.push(`/${region}/cars/car-details/${car.id}`)
                    }
                  >
                    {car.name}
                  </h4>
                  <p>Starts at ${42520}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
