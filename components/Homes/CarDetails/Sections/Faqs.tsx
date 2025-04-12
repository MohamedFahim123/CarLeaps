"use client";

import { Car } from "@/app/[region]/cars/car-details/[id]/page";
import { useState } from "react";

export default function Faqs({ carItem }: { carItem: Car }) {
  const features = carItem.features;

  const featureTypes = [...new Set(features.map((feature) => feature.type))];

  const [openAccordions, setOpenAccordions] = useState<string[]>([
    featureTypes[0],
  ]);

  const toggleAccordion = (type: string) => {
    setOpenAccordions((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="inner-container">
      <h4 className="title mb-4">Car Features</h4>

      <div className="accordion-container">
        {featureTypes.map((type) => (
          <div key={type} className="accordion-item">
            <div
              className={`accordion-header ${
                openAccordions.includes(type) ? "open" : ""
              }`}
              onClick={() => toggleAccordion(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <span className="icon">
                {openAccordions.includes(type) ? "▲" : "▼"}
              </span>
            </div>

            <div
              className={`accordion-content ${
                openAccordions.includes(type) ? "show" : "hidden"
              }`}
            >
              <ul className="features-list">
                {features
                  .filter((feature) => feature.type === type)
                  .map((feature) => (
                    <li key={feature.id}>{feature.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
