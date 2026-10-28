import React from "react";
import styles from "./modelStyle.module.css";
import styles2 from "../Home/heroStyles.module.css";
import { ModelsDetailsInterface } from "@/app/store/ResearchCarMakes";

const KeySpecifications = ({ model }: { model: ModelsDetailsInterface }) => {
  return (
    <section className={`${styles.section} bg-black`}>
      <div className="boxcar-container">
        <h2 className={`${styles2.boxcar_title} text-center text-capitalize text-white mb-4`}>Highlights</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {
            model?.specifications?.slice(0, 6).map((spec) => (
              <div
                key={spec.id}
                className={`${styles.spec_card} mx-3 my-2 text-center p-3 border border-white rounded`}
              >
                <p className={`${styles.section_p} fs-3 fw-bold`}>{spec.title}</p>
                <p className={`${styles.section_p2}`}>{spec.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default React.memo(KeySpecifications);
