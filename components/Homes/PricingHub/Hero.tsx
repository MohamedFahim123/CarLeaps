"use client";

import SelectComponent from "@/components/Common/SelectComponent";
import { banners } from "@/data/heroSlides";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import styles from "./hero.module.css";

interface SlickOptions {
  autoplay: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  arrows: boolean;
  draggable: boolean;
  dots: boolean;
}

export default function Hero() {
  const slickOptions: SlickOptions = {
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
    draggable: false,
    dots: false,
  };

  return (
    <section
      className={`${styles.boxCar_banner_section} boxcar-banner-section-seven v10`}
    >
      <Slider {...slickOptions} className="banner-slider-v7 inner-slide">
        {banners.map((banner, index) => (
          <div className="inner-box d-block" key={index}>
            <div className="boxcar-container">
              <div className="banner-slide">
                <Image
                  alt={banner.subTitle}
                  src={banner.src}
                  width={banner.width}
                  height={banner.height}
                />
                <div className="right-box">
                  <div className="boxcar-container">
                    <div className="content-box">
                      <span
                        className="sub-title"
                        data-animation-in="fadeInDown"
                      >
                        {banner.subTitle}
                      </span>
                      <h1
                        data-animation-in="fadeInUp"
                        data-delay-in="0.2"
                        dangerouslySetInnerHTML={{ __html: banner.mainTitle }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="form-tab-content">
        <div className="cus-container10">
          <div className="form-tab-pane current">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form_boxes">
                <SelectComponent
                  options={["Used Cars", "Used Cars", "Used Cars"]}
                />
              </div>
              <div className="form_boxes">
                <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
              </div>
              <div className="form_boxes">
                <SelectComponent options={["Any Models", "A3", "Accord"]} />
              </div>
              <div className="form_boxes">
                <SelectComponent options={["Any Price", "200$", "300$"]} />
              </div>
              <Link href={`/inventory-list-01`} className="form-submit">
                <button type="submit" className="theme-btn">
                  <i className="flaticon-search" />
                  Search 9451 Cars
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
