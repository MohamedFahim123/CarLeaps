"use client";

import { Features } from "@/app/store/features";
import {
  TrimsDetailsInterface,
  useResearchCarsMakesStore,
} from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./modelStyle.module.css";
import { useCitiesStore } from "@/app/store/Cities";

const ExploreModelSection = ({ trim }: { trim: TrimsDetailsInterface }) => {
  const features = trim?.features || {};
  const [activeIndex, setActive] = useState<number>(0);
  const { currRegion } = useResearchCarsMakesStore();
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === currRegion)?.currency || "";

  const selectedTrimPrice = trim?.cities?.find(
    (city) => city.city === currRegion
  )?.price;

  const handleToggle = (idx: number) => {
    setActive(idx);
  };

  return (
    <>
      <div className="col-lg-6 py-5">
        <Image
          width={600}
          height={700}
          alt={trim?.name || "Default Trim"}
          src={trim?.image || "/default-image.jpg"}
          className={`${styles.trimImage}`}
        />
        <div className="price-section ps-5 d-flex justify-content-center align-items-center gap-3">
          <p className="fw-bold fs-4 mt-3">Starts at: {currentCurrency}{selectedTrimPrice}</p>
          <h4 className="text-primary fs-3 fw-bold"></h4>
        </div>
      </div>
      <div className="col-lg-6 py-5 text-center">
        <h2>Features</h2>
        <div className="accordion" id="accordionExample">
          {Object.keys(features).map((key, index) => {
            const featureCategory = features[key as keyof Features];
            if (Array.isArray(featureCategory) && featureCategory.length > 0) {
              return (
                <div
                  className={`accordion-item ${styles.accordion} ${
                    activeIndex === index + 1 ? "" : "collapsed"
                  }`}
                  key={key}
                >
                  <h2 className="accordion-header" id={`heading${key}`}>
                    <button
                      className={`accordion-button`}
                      type="button"
                      onClick={() => handleToggle(index + 1)}
                      style={{ backgroundColor: "#EDDFFF" }}
                      aria-expanded={activeIndex === index + 1}
                      aria-controls={`collapse${key}`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  </h2>
                  <div
                    id={`collapse${key}`}
                    className={`accordion-collapse collapse ${
                      activeIndex === index + 1 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${key}`}
                    data-bs-parent="#accordionExample"
                  >
                    <ul className={`accordion-body`}>
                      {featureCategory.map(
                        (
                          feature: { type: string; name: string },
                          featureIndex: React.Key | null | undefined
                        ) => (
                          <li className={styles.list} key={featureIndex}>
                            {feature.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default React.memo(ExploreModelSection);
