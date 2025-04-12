"use client";

import { useAdStatesStore } from "@/app/store/ad-states";
import { CPOCarsMakes } from "@/app/store/cpoMakes";
import Image from "next/image";
import Link from "next/link";
import styles from "../Brands/Brands.module.css";

const CPODetailsHero = ({
  brand,
  currRegion,
}: {
  brand: CPOCarsMakes;
  currRegion: string;
}) => {
  const { adStates } = useAdStatesStore();
  const authorizedDealer = adStates.find(
    (state) => state.name === "Authorized New"
  );
  return (
    <div
      className={`boxcar-banner-section-nine ${styles.heroSection}`}
      style={{ backgroundImage: `url(${brand.cover})` }}
    >
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 d-flex justify-content-end flex-column mb-5">
            <div className="section-title">
              <h2 className={`title ${styles.title} position-relative`}>
                {brand.name}
              </h2>
              <div
                className={`brand-logo my-3 position-relative d-inline-block p-2`}
              >
                <div className=" bg-white d-inline-block rounded-circle opacity-100 position-absolute start-0 top-0 w-100 h-100 z-0"></div>
                <Image
                  src={brand.make_image}
                  alt={brand.make_name}
                  width={50}
                  height={50}
                  className="z-1 position-relative"
                />
              </div>
              <p className={`${styles.description} position-relative`}>
                {brand.description}
              </p>
            </div>
            <div className={`d-flex gap-3 position-relative`}>
              <Link
                href={`/${currRegion}/cars/cars-for-sale/search?condition=new&ad_state=${authorizedDealer?.id}&make=${brand.id}`}
                className={`btn btn-outline-light text-capitalize ${styles.buttonLight}`}
              >
                Shop {brand.name}
              </Link>
              <button className={`btn ${styles.transparentBtn}`}>
                About {brand.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPODetailsHero;
