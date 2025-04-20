"use client";
import { useResearchFeatruedItemsStore } from "@/app/store/ResearchCarsFeaturedItems";
import { debounce } from "@/app/utils/debounce";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./brandsStyles.module.css";
import Link from "next/link";

export default function Categories() {
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const { featuredItems, featuredItemsLoading, getFeaturedItems } =
    useResearchFeatruedItemsStore();

  const currItems = useMemo(() => {
    return featuredItems?.find((item) => item?.name === activeTab)?.items || [];
  }, [featuredItems, activeTab]);

  useEffect(() => {
    if (featuredItems.length === 0 && !featuredItemsLoading) {
      getFeaturedItems();
    }
  }, [featuredItems.length, featuredItemsLoading, getFeaturedItems]);

  useEffect(() => {
    if (featuredItems.length > 0 && tabs.length === 0) {
      const newAllTabs = featuredItems.map((item) => item.name);
      setTabs(newAllTabs);
      setActiveTab(newAllTabs[0]);
    }
  }, [featuredItems, tabs.length]);

  const handleChangeActiveTab = useMemo(
    () => debounce((tab: string) => setActiveTab(tab), 300),
    []
  );

  return (
    <section className="category-section">
      <div className="large-container">
        <h2 className="title">A Vehicle For Every Lifestyle</h2>
        <div className="nav nav-tabs cate-nav-tab">
          {tabs?.map((tab) => (
            <button
              title={tab}
              onClick={() => handleChangeActiveTab(tab)}
              className={`nav-link ${tab === activeTab && styles.activeTab}`}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content wow fadeInUp">
          <div className="tab-pane fade show" style={{ display: "block" }}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={5}
              navigation
              breakpoints={{
                1600: {
                  slidesPerView: 4,
                },
                1300: {
                  slidesPerView: 3,
                },
                991: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 1,
                },
              }}
              className="wrap-slider-car car-slider-three relative w-100"
            >
              {currItems?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="box-cate-car">
                    <Link
                      href={item.link !== "N/A" ? item?.link : "#"}
                      target="_blank"
                      className="car-image-home-9"
                    >
                      <Image
                        alt={item.name}
                        src={item.image}
                        width={200}
                        height={100}
                      />
                    </Link>
                    <Link
                      href={item.link !== "N/A" ? item?.link : "#"}
                      target="_blank"
                      className="name"
                    >
                      {item.name}
                    </Link>
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
