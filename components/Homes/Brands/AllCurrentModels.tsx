"use client";

import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Brands.module.css";
import { Models, useModelsStore } from "@/app/store/allModels";
import { MakesCars } from "@/app/store/makeCars";

function AllCurrentModels({ brand }: { brand: MakesCars }) {
  const region: string = Cookies.get("region") || MainRegionName;
  const router = useRouter();
  const { models } = useModelsStore();

  const currentModels: Models[] = models?.filter(
    (model) => +model.make_id === +brand.id
  );

  return (
    <>
      {currentModels.length > 0 && (
        <div className={styles.modelsContainer}>
          <div className="container">
            <div className="row">
              <h2 className="col-12 text-capitalize">All current models</h2>
              {currentModels.map((model, idx) => (
                <div key={idx} className={`col-md-3`}>
                  <div className={styles.modelContainer}>
                    <h4
                      onClick={() =>
                        router.push(`/${region}/cars/${brand.id}/${model.id}`)
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
