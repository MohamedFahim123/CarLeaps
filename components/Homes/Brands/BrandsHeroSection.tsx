import { ResearchCarsMakes } from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import Link from "next/link";
import styles from "./Brands.module.css";

export default function BrandsHeroSection({
  brand,
  currRegion,
}: {
  brand: ResearchCarsMakes;
  currRegion: string;
}) {
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
                  src={brand.image}
                  alt={brand.name}
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
                href={`/${currRegion}/cars/cars-for-sale/search?condition=new&dealer_type=authorized_dealer&make=${brand.id}`}
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
}
