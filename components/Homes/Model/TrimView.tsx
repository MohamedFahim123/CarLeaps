"use client";

import { Models } from "@/app/store/allModels";
import ExploreModelSection from "./ExploreModelSection";
import styles from "./modelStyle.module.css";
import { Trims, useTrimsStore } from "@/app/store/allTirms";
import { useState } from "react";

export default function TrimView({ model }: { model: Models }) {
  const { trims } = useTrimsStore();
  const currTrims: Trims[] = trims?.filter((trim) => +trim.id === +model.id);
  const [chosenTrim, setChosenTrim] = useState(currTrims[0]);

  console.log(currTrims)

  return (
    <>
      {currTrims.length > 0 && (
        <div className={`${styles.sectionDiff} ${styles.section}`}>
          <div className="boxcar-container">
            <div className={`${styles.brandsBannerHead}`}>
              <p>Explore the full range</p>
              <h3>Find the {model.name} that{"'"}s right for you</h3>
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
