"use client";
import { MakesCars, useMakesCarsStore } from "@/app/store/makeCars";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./brandsStyles.module.css";

export default function ResearchCarsBrands() {
  const router = useRouter();
  const Region: string = Cookies.get("region") || MainRegionName;
  const { makesCars } = useMakesCarsStore();


  return (
    <section className="boxcar-brand-section-five pt-0">
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className="wow fadeInUp">Explore Our Premium Brands</h2>
        </div>
        <div className={`${styles.carMakeContainer} right-box`}>

          {makesCars?.map((make: MakesCars) => (
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
                  <h6 className="title mt-1">
                    {make.name}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
