"use client";
import { carItemsSearch } from "@/data/cars";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Nav from "./Nav";
import styles from './headerStyles.module.css';

interface Header1Props {
  headerClass?: string;
  white?: boolean;
};

export default function Header1({
  headerClass = "header-style-v1 header-default",
  white = false,
}: Header1Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currRegion, setCurrRegion] = useState<string>("riyadh");

  useEffect(() => {
    const region = Cookies.get("region") || "riyadh";
    setCurrRegion(region);
  }, []);

  const handleFocus = () => {
    const searchBox = document.getElementById("box-content-search");
    const layoutSearch = searchBox?.closest(".layout-search");
    if (searchBox) searchBox.classList.add("active");
    if (layoutSearch) layoutSearch.classList.add("active");
  };

  const handleBlur = () => {
    const searchBox = document.getElementById("box-content-search");
    const layoutSearch = searchBox?.closest(".layout-search");
    if (searchBox) searchBox.classList.remove("active");
    if (layoutSearch) layoutSearch.classList.remove("active");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  return (
    <header className={`boxcar-header ${styles.backGroundBlack} ${styles.mainPadding} ${headerClass}`}>
      <div className="header-inner py-3">
        <div className="inner-container">
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/${currRegion}/cars/home`}>
                  {white ? (
                    <Image
                      alt="Valid Cars logo"
                      title="Valid Cars"
                      src="/images/weblogo.png"
                      width={108}
                      height={26}
                    />
                  ) : (
                    <Image
                      alt="Valid Cars logo"
                      title="Valid Cars"
                      src="/images/weblogo.png"
                      width={108}
                      height={26}
                    />
                  )}
                </Link>
              </div>

              <div className="layout-search">
                <div className="search-box">
                  <svg
                    className="icon"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.29301 1.2876C3.9872 1.2876 1.29431 3.98048 1.29431 7.28631C1.29431 10.5921 3.9872 13.2902 7.29301 13.2902C8.70502 13.2902 10.0036 12.7954 11.03 11.9738L13.5287 14.4712C13.6548 14.5921 13.8232 14.6588 13.9979 14.657C14.1725 14.6552 14.3395 14.5851 14.4631 14.4617C14.5867 14.3382 14.6571 14.1713 14.6591 13.9967C14.6611 13.822 14.5947 13.6535 14.474 13.5272L11.9753 11.0285C12.7976 10.0006 13.293 8.69995 13.293 7.28631C13.293 3.98048 10.5988 1.2876 7.29301 1.2876ZM7.29301 2.62095C9.87824 2.62095 11.9584 4.70108 11.9584 7.28631C11.9584 9.87153 9.87824 11.9569 7.29301 11.9569C4.70778 11.9569 2.62764 9.87153 2.62764 7.28631C2.62764 4.70108 4.70778 2.62095 7.29301 2.62095Z"
                      fill="white"
                    />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search Cars eg. Audi Q7"
                    className="show-search"
                    name="name"
                    tabIndex={2}
                    aria-required="true"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="box-content-search" id="box-content-search">
                  <ul className="box-car-search">
                    {
                      carItemsSearch
                        .filter((elm) =>
                          elm.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((car) => (
                          <li key={car.id}>
                            <Link
                              href={`/inventory-page-single-v1/${car.id}`}
                              className="car-search-item"
                            >
                              <div className="box-img">
                                <Image
                                  alt="Car image"
                                  src={car.imgSrc}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <div className="info">
                                <p className="name">{car.title}</p>
                                <span className="price">${car.newPrice}</span>
                              </div>
                            </Link>
                          </li>
                        ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar mx-auto">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="right-box ms-auto">
              <Link href={`/${currRegion}/auth/login`} title="" className="box-account">
                <span className="icon">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_147_6490)">
                      <path
                        d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                        fill="white"
                      />
                      <path
                        d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_147_6490">
                        <rect width={16} height={16} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Sign in
              </Link>
              <div className="btn">
                <Link href={`/${currRegion}/dashboard/profile`} className="btn btn-light">
                  Car Portal
                </Link>
              </div>
              <div className="mobile-navigation">
                {white ? (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="#050B20" />
                      <rect y={9} width={22} height={2} fill="#050B20" />
                    </svg>
                  </a>
                ) : (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="white" />
                      <rect y={9} width={22} height={2} fill="white" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
        </div>
      </div>
      <div className="search-popup">
        <span className="search-back-drop" />
        <button type="button" title="close search" className="close-search">
          <span className="fa fa-times" />
        </button>
        <div className="search-inner">
          <form onSubmit={(e) => e.preventDefault()} method="post">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                defaultValue=""
                placeholder="Search..."
                required
              />
              <button title="search" type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="nav-mobile" />
    </header>
  );
};