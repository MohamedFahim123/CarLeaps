"use client";

import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { slugifyCarSegment } from "@/app/lib/cars/paths";
import { ResearchCarsMakes } from "@/app/store/ResearchCarMakes";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Brands.module.css";
import styles2 from "../Home/heroStyles.module.css";

function AllCurrentModels({ brand }: { brand: ResearchCarsMakes }) {
  const region = useRouteRegion();
  const router = useRouter();

  return (
    <>
      {brand.models.length > 0 && (
        <div className={styles.modelsContainer}>
          <div className="boxcar-container">
            <div className="row">
              <h2 className={`${styles2.boxcar_title} col-12 text-capitalize`}>All current models</h2>
              {brand.models.map((model, idx) => (
                <div key={idx} className={`col-lg-3 col-md-4`}>
                  <div className={styles.modelContainer}>
                    <h4
                      onClick={() =>
                        router.push(
                          `/${region}/cars/${slugifyCarSegment(
                            brand?.name || ""
                          )}/${slugifyCarSegment(model?.name || "")}`
                        )
                      }
                    >
                      {model.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default React.memo(AllCurrentModels);
