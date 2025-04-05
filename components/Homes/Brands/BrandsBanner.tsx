"use client";

import {
  ModelsDetailsInterface,
  ResearchCarsMakes,
} from "@/app/store/ResearchCarMakes";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Brands.module.css";

import { useCitiesStore } from "@/app/store/Cities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useResearchBoodiesStore } from "@/app/store/ResearchCarBoodies";

export default function BrandsBanner({
  brand,
  currRegion,
}: {
  brand: ResearchCarsMakes;
  currRegion: string;
}) {
  const { researchBoodies, researchBoodiesLoading, getResearchBoodies } =
    useResearchBoodiesStore();

  const getAllResearchBoodies = useCallback(() => {
    if (!researchBoodies && !researchBoodiesLoading) {
      getResearchBoodies();
    }
  }, [getResearchBoodies, researchBoodiesLoading, researchBoodies]);

  useEffect(() => {
    getAllResearchBoodies();
  }, [getAllResearchBoodies]);

  const [selectedCategory, setSelectedCategory] = useState("");
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
      setSelectedCategory(researchBoodies?.models[0]?.body.name);
      setSelectedModel(researchBoodies?.models[0]);
    }
  }, [researchBoodies?.models, selectedCategory]);


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
              {researchBoodies?.models?.map((model) => (
                <button
                  key={model.body.id}
                  onClick={() => setSelectedCategory(model.body.name)}
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
          {selectedModel?.models &&
            selectedModel?.models?.length > 0 &&
            selectedModel?.models?.map((model) => (
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
