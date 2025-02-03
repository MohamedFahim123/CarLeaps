"use client";
import { useCountriesStore } from "@/app/store/countries";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Nav from "./Nav";
import styles from "./headerStyles.module.css";

interface Header1Props {
  headerClass?: string;
  white?: boolean;
}

export default function Header1({ headerClass = "header-style-v1 header-default", white = false }: Header1Props) {
  const pathName = usePathname();
  const [currRegion, setCurrRegion] = useState<string>(MainRegionName);
  const { countries, getCountries, countriesLoading } = useCountriesStore();

  const getAllCountries = useCallback(() => {
    if (countries.length === 0 && !countriesLoading) {
      getCountries();
    }
  }, [getCountries, countriesLoading, countries.length]);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);
  const condition: boolean = pathName.includes(`/${currRegion}/cars/cars-for-sale/search`) || pathName.includes(`/${currRegion}/cars/car-details`) || pathName.includes(`/${currRegion}/cars/perfect-match`);

  return (
    <header className={`boxcar-header ${styles.backGroundBlack} ${!condition && styles.mainPadding} ${headerClass}`}>
      <div className="header-inner py-3">
        <div className="inner-container">
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/${currRegion}/cars/home`}>{white ? <Image alt="Valid Cars logo" title="Valid Cars" src="/images/weblogo.png" width={108} height={26} /> : <Image alt="Valid Cars logo" title="Valid Cars" src="/images/weblogo.png" width={108} height={26} />}</Link>
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
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <Link href={`/${currRegion}/dashboard/profile`} className="btn btn-light px-3">
                  Car Portal
                </Link>
              </div>
              <div className="mobile-navigation">
                {white ? (
                  <a href="#nav-mobile" title="">
                    <svg width={22} height={11} viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width={22} height={2} fill="#050B20" />
                      <rect y={9} width={22} height={2} fill="#050B20" />
                    </svg>
                  </a>
                ) : (
                  <a href="#nav-mobile" title="">
                    <svg width={22} height={11} viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div id="nav-mobile" />
    </header>
  );
}
