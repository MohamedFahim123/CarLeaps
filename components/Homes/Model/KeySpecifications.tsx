import React from "react";
import styles from "./modelStyle.module.css";
import { ModelsDetailsInterface } from "@/app/store/ResearchCarMakes";

const KeySpecifications = ({ model }: { model: ModelsDetailsInterface }) => {
  return (
    <section className={`${styles.section} bg-black`}>
      <div className="boxcar-container">
        <h2 className="text-center text-uppercase text-white mb-4">Highlights</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {
            model.specifications?.map((spec) => (
              <div
                key={spec.id}
                className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
              >
                <p className="fs-3 fw-bold">{spec.title}</p>
                <p>{spec.description}</p>
              </div>
            ))
          }
          {/* <div
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
          </div> */}
        </div>
        {/* <div className="text-center mt-4">
          <a href="#" className="btn btn-outline-light">
            See specifications list →
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default React.memo(KeySpecifications);
