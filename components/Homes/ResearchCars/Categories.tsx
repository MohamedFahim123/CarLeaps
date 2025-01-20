"use client";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import { cars } from "@/data/categories";

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

    return (
        <section className="category-section">
            <div className="large-container">
                <h2 className="title">A Vehicle For Every Lifestyle</h2>
                <div className="nav nav-tabs cate-nav-tab">
                    <button title="Truck" className="nav-link">Truck</button>
                    <button title="Sedan" className="nav-link">Sedan</button>
                    <button title="Coupe" className="nav-link">Coupe</button>
                    <button title="Convertible" className="nav-link">Convertible</button>
                    <button title="SUV" className="nav-link ">SUV</button>
                    <button title="VAN" className="nav-link">VAN</button>
                    <button title="Hatchback" className="nav-link">Hatchback</button>
                    <button title="Wagon" className="nav-link">Wagon</button>
                    <button title="Hybird" className="nav-link">Hybird</button>
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
};