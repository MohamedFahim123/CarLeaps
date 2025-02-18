"use client";

import { Models } from "@/app/store/allModels";
import { useState } from "react";
import ExploreModelSection from "./ExploreModelSection";
import styles from "./Models.module.css";
import { Trims, useTrimsStore } from "@/app/store/allTirms";

const buttons: { label: string; isActive: boolean }[] = [
  { label: "Specifications", isActive: true },
  { label: "Specifications 2", isActive: false },
  { label: "Specifications 3", isActive: false },
];

export default function TrimView({ model }: { model: Models }) {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const { trims } = useTrimsStore();
  const currTrims: Trims[] = trims?.filter((trim) => trim.id == model.id);

  return (
    <>
      {currTrims.length > 0 && (
        <div className={`${styles.sectionDiff} ${styles.section}`}>
          <div className="boxcar-container">
            <div className={`${styles.brandsBannerHead}`}>
              <p>Explore the full range</p>
              <h3>Find the Alfa Romeo that{"'"}s right for you</h3>
              <nav className="wow fadeInUp" data-wow-delay="100ms">
                <div className="nav nav-tabs">
                  {buttons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(button)}
                      className={`nav-link ${
                        selectedCategory == button ? "active" : ""
                      }`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            {currTrims?.map((trim, idx) => (
              <div className="row" key={idx}>
                <ExploreModelSection
                  trim={trim}
                  model={model}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
// <ExploreModelSection exploreModel={selectedModel.exploreModel} />
