"use client";
import { Models } from "@/app/store/allModels";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import styles from "./modelStyle.module.css";

export default function ModelHeroSection({ model }: { model: Models }) {
  const region: string = Cookies.get("region") || MainRegionName;

  return (
    <section className={`${styles.hero_section} position-relative`}>
      <div className={`${styles.hero_bg}`}>
        <Image
          src={model.cover}
          alt="Car Background"
          fill
          className="img-fluid object-fit-cover"
          style={{ zIndex: -1 }}
        />
      </div>
      <div className="boxcar-container position-relative py-5 d-flex flex-column justify-content-between h-100">
        <nav className={`${styles.breadcrumb} position-relative z-1`}>
          <Link
            href={`/${region}/cars/home`}
            className="breadcrumb-item active ms-1"
          >
            Home /
          </Link>
          <Link
            href={`/${region}/cars/${model.make_id}`}
            className="breadcrumb-item active ms-1"
          >
            {model.make} /
          </Link>
          <Link
            href={`/${region}/cars/${model.make_id}/${model.id}`}
            className="breadcrumb-item active ms-1"
          >
            {model.name}
          </Link>
        </nav>
        <div
          className={`${styles.hero_content} bg-light p-4 rounded shadow-sm`}
        >
          <h1 className="fw-bold mb-5">Alfa Romeo Tonale</h1>
          <p className="text-muted fs-5 mb-5">
            <Image
              src={model.image}
              alt={`${model.make} Logo`}
              width={30}
              height={30}
              className="me-2"
            />
            Alfa Romeo
          </p>
          <div className="price-section mb-5 d-flex align-items-center gap-3">
            <p className="fw-bold fs-4">Starts at:</p>
            <h4 className="text-primary fs-3 fw-bold">$43,845</h4>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-4">
            <button className="btn btn-dark btn-lg px-4 w-100 text-capitalize">
              Book a test drive
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
