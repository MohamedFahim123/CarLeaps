"use client";

import { Models } from "@/app/store/allModels";
import { Trims } from "@/app/store/allTirms";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./Models.module.css";

const ExploreModelSection = ({
  model,
  trim,
}: {
  model: Models;
  trim: Trims;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? 0 : index);
  };

  return (
    <>
      <div className="col-lg-6 py-5">
        <Image width={600} height={700} alt={trim.name} src={trim.image} />
        <div className="price-section ps-5 mb-5 d-flex align-items-center gap-3">
          <p className="fw-bold fs-4">Starts at:</p>
          <h4 className="text-primary fs-3 fw-bold">$43,845</h4>
        </div>
      </div>
      <div className="col-lg-6 py-5">
        <h2>Specifications</h2>
        <div className="accordion" id="accordionExample">
          {model?.specifications?.map((model, index) => (
            <div
              key={index}
              className={`accordion-item ${styles.accordion} ${
                activeIndex === index ? styles.activeAccordion : ""
              }`}
            >
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    activeIndex === index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`collapse${index}`}
                >
                  {model?.title.toUpperCase() || "Unknown Model Name"}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  activeIndex === index ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>
                    {model.subtitle.toUpperCase() || "Unknown Model Name"}
                  </strong>
                  <p>
                    {model.description.toUpperCase() ||
                      "Unknown Model Description"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(ExploreModelSection);
