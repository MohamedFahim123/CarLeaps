"use client";
import {
  ModelsDetailsInterface,
  ResearchCarsMakes,
  useResearchCarsMakesStore,
} from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import Link from "next/link";
import styles from "./modelStyle.module.css";
import { useCitiesStore } from "@/app/store/Cities";

export default function ModelHeroSection({
  model,
  selectedMake,
}: {
  selectedMake: ResearchCarsMakes;
  model: ModelsDetailsInterface;
}) {
  const { currRegion } = useResearchCarsMakesStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";

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
            href={`/${currRegion}/cars/home`}
            className={`${styles.linkNavBreadCrumb} breadcrumb-item active ms-1`}
          >
            Home /
          </Link>
          <Link
            href={`/${currRegion}/cars/${model?.make?.toLowerCase()}`}
            className={`${styles.linkNavBreadCrumb} breadcrumb-item active ms-1`}
          >
            {model.make} /
          </Link>
          <Link
            href={`/${currRegion}/cars/${model?.make?.toLowerCase()}/${model?.name?.toLowerCase()}`}
            className={`${styles.linkNavBreadCrumb} breadcrumb-item active ms-1`}
          >
            {model.name}
          </Link>
        </nav>
        <div
          className={`${styles.hero_content} bg-light p-4 rounded shadow-sm`}
        >
          <h1 className="fw-bold mb-5">
            {model.make} - {model.name}
          </h1>
          <p className="text-muted fs-5 mb-5">
            <Image
              src={selectedMake.image}
              alt={`${model.make} Logo`}
              width={50}
              height={50}
              className="me-2"
            />
            {model.name}
          </p>
          <div className="price-section mb-5 d-flex align-items-center gap-3">
            <p className="fw-bold fs-4">Starts at:</p>
            <h4 className="text-primary fs-3 fw-bold">
              {currentCurrency}43,845
            </h4>
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
