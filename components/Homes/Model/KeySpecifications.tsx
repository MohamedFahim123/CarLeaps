import React from "react";
import styles from "./Models.module.css";

const KeySpecifications = () => {
  return (
    <section className={`${styles.section} bg-black`}>
      <div className="boxcar-container">
        <h2 className="text-center text-white mb-4">Key Specifications</h2>
        <div className="d-flex flex-wrap justify-content-center">
          <div
            className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
          >
            <p className="fs-3 fw-bold">2,000 lbs</p>
            <p>Towing Capacity</p>
          </div>
          <div
            className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
          >
            <p className="fs-3 fw-bold">Intercooled Turbo</p>
            <p>Gas/Electric I-4</p>
          </div>
          <div
            className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
          >
            <p className="fs-3 fw-bold">22 / 29</p>
            <p>MPGe</p>
          </div>
          <div
            className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
          >
            <p className="fs-3 fw-bold">35 mi.</p>
            <p>Range</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="#" className="btn btn-outline-light">
            See specifications list →
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(KeySpecifications);
