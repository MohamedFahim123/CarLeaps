
import Image from "next/image";
import styles from "./Brands.module.css";
import { MakesCars } from "@/app/store/makeCars";

export default function BrandsHeroSection({ brand }: {brand: MakesCars}) {
  return (
    <div className={`boxcar-banner-section-nine ${styles.heroSection}`}>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 d-flex justify-content-end flex-column mb-5">
            <div className="section-title">
              <h2 className={`title ${styles.title} position-relative`}>{brand.name}</h2>
              <div className={`brand-logo my-3 position-relative`}>
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={50}
                  height={50}
                />
              </div>
              <p className={`${styles.description} position-relative`}>{brand.description}</p>
            </div>
            <div className={`d-flex gap-3 position-relative`}>
              <button className={`btn btn-outline-light text-capitalize ${styles.buttonLight}`}>Shop {brand.name}</button>
              <button className={`btn ${styles.transparentBtn}`}>About {brand.name}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
