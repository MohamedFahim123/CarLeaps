"use client";

import { ResearchCarsMakes } from "@/app/store/ResearchCarMakes";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Brands.module.css";

import { useCitiesStore } from "@/app/store/Cities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandsBanner({
  brand,
  currRegion,
}: {
  brand: ResearchCarsMakes;
  currRegion: string;
}) {
  const [buttons, setButtons] = useState<string[]>(["All Cars"]);
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const router = useRouter();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";

  useEffect(() => {
    const currModels = brand.models.map((model) => model.name);
    setButtons([...buttons, ...currModels]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand.models]);


  return (
    <div className={styles.brandsBannerSection}>
      <div className="boxcar-container">
        <div className={`${styles.brandsBannerHead}`}>
          <p>Explore the full range</p>
          <h3>
            Find the {brand.name} that{"'"}s right for you in {currRegion}
          </h3>
          <nav className="wow fadeInUp" data-wow-delay="100ms">
            <div className="nav nav-tabs">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(button)}
                  className={`nav-link ${styles.navLink} ${
                    selectedCategory == button ? "active" : ""
                  }`}
                >
                  {button}
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
          {brand?.models &&
            brand?.models?.length > 0 &&
            brand?.models?.map((model) =>
              model.name === selectedCategory ? (
                <SwiperSlide key={model.id}>
                  <div className={`brand-block ${styles.brandBlock}`}>
                    <Link href={`/${currRegion}/cars/car-details/${model.id}`}>
                      <Image
                        alt={`${model.name} Image`}
                        src={model.image}
                        width={300}
                        height={100}
                      />
                    </Link>
                    <h4
                      onClick={() =>
                        router.push(`/${currRegion}/cars/${brand.id}/${model.id}`)
                      }
                    >
                      {model.name}
                    </h4>
                    <p>
                      Starts at {currentCurrency}
                      {122222}
                    </p>
                  </div>
                </SwiperSlide>
              ) : (
                selectedCategory === "All Cars" && (
                  <SwiperSlide key={model.id}>
                    <div className={`brand-block ${styles.brandBlock}`}>
                      <Link href={`/${currRegion}/cars/${brand.id}/${model.id}`}>
                        <Image
                          alt={`${model.name} Image`}
                          src={model.image}
                          width={300}
                          height={100}
                        />
                      </Link>
                      <h4
                        onClick={() =>
                          router.push(
                            `/${currRegion}/cars/${brand.id}/${model.id}`
                          )
                        }
                      >
                        {model.name}
                      </h4>
                      <p>
                        Starts at {currentCurrency}
                        {122222}
                      </p>
                    </div>
                  </SwiperSlide>
                )
              )
            )}
        </Swiper>
      </div>
    </div>
  );
}
