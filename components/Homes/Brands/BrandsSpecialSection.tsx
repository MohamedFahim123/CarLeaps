import React from "react";
import styles from "./Brands.module.css";

function BrandsSpecialSection() {
  return (
    <div className={styles.specialSectionContainer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h3>Shop online</h3>
            <p>
              Experience Italian Design and Performance at its best. Find Your
              Alfa Romeo today by contacting your Local Retailer.
            </p>
            <button className="btn btn-light">Shop Online</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(BrandsSpecialSection);
