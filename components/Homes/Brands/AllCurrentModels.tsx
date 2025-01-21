"use client";

import React from "react";
import { Brand } from "./Data";
import styles from "./Brands.module.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MainRegionName } from "@/app/utils/mainData";

function AllCurrentModels({ brand }: { brand: Brand }) {
  const region: string = Cookies.get("region") || MainRegionName;
  const router = useRouter();

  return (
    <div className={styles.modelsContainer}>
      <div className="container">
        <div className="row">
          <h2 className="col-12 text-capitalize">All current models</h2>
          {brand.models.map((model, idx) => (
            <div key={idx} className={`col-md-3`}>
              <div className={styles.modelContainer}>
                <h4
                  onClick={() =>
                    router.push(`/${region}/cars/${brand.slug}/${model.name}`)
                  }
                >
                  {model.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default React.memo(AllCurrentModels);
