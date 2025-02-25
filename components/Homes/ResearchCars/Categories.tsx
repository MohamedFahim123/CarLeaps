"use client";
import { useBodiesStore } from "@/app/store/bodies";
import { cars } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

export default function Categories() {
  const slickOptions = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { bodies } = useBodiesStore();

  return (
    <section className="category-section">
      <div className="large-container">
        <h2 className="title">A Vehicle For Every Lifestyle</h2>
        <div className="nav nav-tabs cate-nav-tab">
          {bodies?.map((body) => (
            <button title={body.name} className="nav-link" key={body?.id}>
              {body.name}
            </button>
          ))}
        </div>
        <div className="tab-content wow fadeInUp">
          <div className="tab-pane fade show" style={{ display: "block" }}>
            <Slider
              {...slickOptions}
              className="wrap-slider-car car-slider-three relative w-100"
            >
              {cars.map((car, index) => (
                <div className="box-cate-car" key={index}>
                  <Link href={car.href} className="car-image-home-9">
                    <Image
                      alt={car.name}
                      src={car.src}
                      width={car.width}
                      height={car.height}
                    />
                  </Link>
                  <Link href={car.href} className="name">
                    {car.name}
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
