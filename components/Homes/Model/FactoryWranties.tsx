import React from "react";
import styles from "./modelStyle.module.css";
import { WarrantiesInterface } from "@/app/store/ResearchCarMakes";

function FactoryWranties({
  warranties,
}: {
  warranties: WarrantiesInterface[];
}) {
  return (
    <section className={`${styles.sectionDiff} ${styles.section} border-top py-5`}>
      <div className="boxcar-container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-capitalize">Factory warranties</h2>
          </div>
          {warranties?.map((factorywranty) => (
            <div key={factorywranty.id} className="col-md-4">
              <div className={`mb-3 ${styles.factoryWranties}`}>
                <h3 className="fs-6 mb-0 fw-bold text-capitalize">
                  {factorywranty.title}
                </h3>
                <p className="mb-1 pt-0">{factorywranty.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(FactoryWranties);
