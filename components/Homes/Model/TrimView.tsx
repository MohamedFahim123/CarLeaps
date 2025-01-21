"use client";

import React, { useState } from "react";
import styles from "./Models.module.css";
import { MODEL } from "./data";
import ExploreModelSection from "./ExploreModelSection";

const buttons: { label: string; isActive: boolean }[] = [
  { label: "Specifications", isActive: true },
  { label: "Specifications 2", isActive: false },
  { label: "Specifications 3", isActive: false },
];

export default function TrimView({ model }: { model: MODEL }) {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);

  return (
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
        {model.trims?.map((trim, idx) => (
          <div className="row" key={idx}>
            <ExploreModelSection
              trim={trim}
              exploreModel={model.exploreModel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
// <ExploreModelSection exploreModel={selectedModel.exploreModel} />
