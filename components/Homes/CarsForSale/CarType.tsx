"use client";

import { useBodiesStore } from "@/app/store/bodies";
import { MainRegionName } from "@/app/utils/mainData";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

export default function CarType() {
  const region: string = Cookies.get("region") || MainRegionName;
  const { bodies } = useBodiesStore();

  return (
    <section className="boxcar-brand-section-six">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Browse by Type</h2>
        </div>
        <div className="right-box">
          {bodies.map((body) => (
            <div key={body.id} className="cars-block-six home-8">
              <div className="inner-box wow fadeInUp">
                <div className="image-box">
                  <Image
                    src={body.image}
                    width={35}
                    height={35}
                    alt={body.name}
                  />
                </div>
                <div className="content-box">
                  <h6 className="title">
                    <Link href={`/${region}/cars/search?body=${body.id}`}>
                      {body.name}
                    </Link>
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
