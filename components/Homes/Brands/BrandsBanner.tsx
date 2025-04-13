"use client";

import {
  ModelsDetailsInterface,
  ResearchCarsMakes,
} from "@/app/store/ResearchCarMakes";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Brands.module.css";

import { useCitiesStore } from "@/app/store/Cities";
import { useResearchBoodiesStore } from "@/app/store/ResearchCarBoodies";
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
  const { researchBoodies, getResearchBoodies } = useResearchBoodiesStore();

  useEffect(() => {
    if (brand?.id) getResearchBoodies(brand?.id);
  }, [getResearchBoodies, brand?.id]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allCurrModels, setAllCurrModels] = useState<ModelsDetailsInterface[]>(
    []
  );
  const [selectedModel, setSelectedModel] = useState<{
    body: {
      id: number;
      name: string;
      image: string;
    };
    models: ModelsDetailsInterface[];
  } | null>(null);
  const router = useRouter();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";

  useEffect(() => {
    if (
      !selectedCategory &&
      researchBoodies?.models[0]?.body?.name &&
      researchBoodies?.models[0]
    ) {
      setSelectedModel(researchBoodies?.models[0]);
      setSelectedCategory("All");
    }
  }, [researchBoodies?.models, selectedCategory]);

  useEffect(() => {
    if (researchBoodies?.models && allCurrModels?.length == 0) {
      setAllCurrModels(
        researchBoodies?.models?.reduce<ModelsDetailsInterface[]>(
          (acc, model) => acc.concat(model?.models),
          []
        )
      );
    }
  }, [researchBoodies?.models, allCurrModels]);

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
              <button
                onClick={() => setSelectedCategory("All")}
                className={`nav-link ${styles.navLink} ${
                  selectedCategory == "All" ? "active" : ""
                }`}
              >
                All
              </button>
              {researchBoodies?.models?.map((model) => (
                <button
                  key={model.body.id}
                  onClick={() => {
                    setSelectedCategory(model.body.name);
                    setSelectedModel(model);
                  }}
                  className={`nav-link ${styles.navLink} ${
                    selectedCategory == model.body.name ? "active" : ""
                  }`}
                >
                  {model.body.name}
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
          {selectedCategory === "All"
            ? allCurrModels?.map((model) => (
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
                        router.push(
                          `/${currRegion}/cars/${brand.id}/${model.id}`
                        )
                      }
                    >
                      {model.name}
                    </h4>
                    <p>
                      Starts at {currentCurrency}
                      {model.start_price}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            : selectedModel?.models?.map((model) => (
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
                        router.push(
                          `/${currRegion}/cars/${brand.id}/${model.id}`
                        )
                      }
                    >
                      {model.name}
                    </h4>
                    <p>
                      Starts at {currentCurrency}
                      {model.start_price}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
