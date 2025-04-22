"use client";

import { ModelsDetailsInterface } from "@/app/store/ResearchCarMakes";
import { useState } from "react";
import styles2 from "../Home/heroStyles.module.css";
import ExploreModelSection from "./ExploreModelSection";
import styles from "./modelStyle.module.css";

export default function TrimView({ model }: { model: ModelsDetailsInterface }) {
  const currTrims = model?.trims;
  const [chosenTrim, setChosenTrim] = useState(currTrims[0]);

  return (
    <>
      {currTrims.length > 0 && (
        <div className={`${styles.sectionDiff} ${styles.section}`}>
          <div className="boxcar-container">
            <div className={`${styles.brandsBannerHead}`}>
              <p>Explore the full range</p>
              <h3 className={`${styles2.boxcar_title} fw-semibold`}>
                Find the {model.name} that{"'"}s right for you
              </h3>
              <nav className="wow fadeInUp" data-wow-delay="100ms">
                <div className="nav nav-tabs">
                  {currTrims.map((trim) => (
                    <button
                      key={trim.id}
                      className={`nav-link ${
                        chosenTrim?.id === trim.id ? "active" : ""
                      }`}
                      onClick={() => setChosenTrim(trim)}
                    >
                      {trim.name}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            {currTrims?.map((trim) => (
              <div className="row" key={trim.id}>
                <ExploreModelSection trim={trim} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
// <ExploreModelSection exploreModel={selectedModel.exploreModel} />
