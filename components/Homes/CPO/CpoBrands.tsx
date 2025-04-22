"use client";

import { useCPOCarsMakesStore } from "@/app/store/cpoMakes";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../ResearchCars/brandsStyles.module.css";
import styles2 from "../Home/heroStyles.module.css";

const CpoBrands = () => {
  const { currRegion } = useResearchCarsMakesStore();
  const { CPOCarsMakes } = useCPOCarsMakesStore();
  const router = useRouter();

  return (
    <section className="boxcar-brand-section-five">
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className={`${styles2.boxcar_title} wow fadeInUp`}>Research By Brand</h2>
        </div>
        <div className={`${styles.carMakeContainer} right-box`}>
          {CPOCarsMakes?.map((make) => (
            <div
              className={`${styles.carMake} cars-block-five`}
              key={make?.id}
              onClick={() =>
                router.push(
                  `/${currRegion}/cars/certified-preowned-cars/${make.id}`
                )
              }
            >
              <div className={`inner-box wow fadeInUp`}>
                <div className="image-box">
                  <figure className="image">
                    <Image
                      alt={make.make_name}
                      src={make.make_image}
                      width={70}
                      height={70}
                    />
                  </figure>
                </div>
                <div className="content-box">
                  <h6 className="title mt-1">{make.make_name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CpoBrands;
