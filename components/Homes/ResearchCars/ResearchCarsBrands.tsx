"use client";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./brandsStyles.module.css";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";

export default function ResearchCarsBrands() {
  const router = useRouter();
  const Region: string = Cookies.get("region") || MainRegionName;
  const { researchCarsMakes } = useResearchCarsMakesStore();

  return (
    <section className="boxcar-brand-section-five">
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className="wow fadeInUp">Research By Brand</h2>
        </div>
        <div className={`${styles.carMakeContainer} right-box`}>
          {researchCarsMakes?.map((make) => (
            <div
              className={`${styles.carMake} cars-block-five`}
              key={make?.id}
              onClick={() => router.push(`/${Region}/cars/${make.id}`)}
            >
              <div className={`inner-box wow fadeInUp`}>
                <div className="image-box">
                  <figure className="image">
                    <Image
                      alt={make.name}
                      src={make.image}
                      width={70}
                      height={70}
                    />
                  </figure>
                </div>
                <div className="content-box">
                  <h6 className="title mt-1">{make.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
