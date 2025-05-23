"use client";

import { MainRegionName } from "@/app/utils/mainData";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import styles from "../Home/heroStyles.module.css";
import { Suspense } from "react";
import Loader from "@/components/Common/Loader";

export default function CarType() {
  const region: string = Cookies.get("region") || MainRegionName;
  const { boodies, carsForSaleLoading } = useCarsForSaleStore();
  const router = useRouter();

  return (
    <Suspense fallback={<Loader />}>
      <section className="boxcar-brand-section-six pb-0">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp">
            <h2 className={`${styles.boxcar_title} wow fadeInUp`}>
              Browse by Type
            </h2>
          </div>
          <div className="right-box">
            {carsForSaleLoading ? (
              <h3>Loading...</h3>
            ) : (
              boodies.map((body) => (
                <div
                  key={body.id}
                  className="cars-block-six home-8 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/${region}/cars/cars-for-sale/search?body=${body.id}`
                    )
                  }
                >
                  <div className="inner-box wow fadeInUp p-2">
                    <div className="image-box">
                      <Image
                        src={body.image}
                        width={100}
                        height={100}
                        alt={body.name}
                      />
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link
                          href={`/${region}/cars/cars-for-sale/search?body=${body.id}`}
                        >
                          {body.name}
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Suspense>
  );
}
