"use client";

import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./brandsStyles.module.css";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import styles2 from '../Home/heroStyles.module.css';

export default function CarsForSaleBrands() {
  const router = useRouter();
  const Region: string = Cookies.get("region") || MainRegionName;
  const { makes } = useCarsForSaleStore();

  return (
    <section className="boxcar-brand-section-five pb-0">
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className={`${styles2.boxcar_title} wow fadeInUp`}>Browse By Make</h2>
        </div>
        <div className={`${styles.carMakeContainer} right-box`}>
          {makes?.map((make) => (
            <div
              className={`${styles.carMake} cars-block-five`}
              key={make?.id}
              onClick={() =>
                router.push(
                  `/${Region}/cars/cars-for-sale/search?make=${make.id}`
                )
              }
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
