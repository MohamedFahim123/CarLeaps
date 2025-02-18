"use client";

import Image from "next/image";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import styles from "./Brands.module.css";
import { MakesCars } from "@/app/store/makeCars";

function BrandsChooseUs({ brand }: {brand: MakesCars}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <section
        className={`boxcar-pricing-section pb-0 pt-0 ${styles.chooseUsSection}`}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="h-100">
                    <Image
                      alt=""
                      src="/images/resource/pricing1-1.jpg"
                      width={836}
                      height={800}
                    />
                  </figure>
                  <a
                    onClick={() => setOpen(true)}
                    className="play-now"
                    data-caption=""
                  >
                    <i className="fa fa-play" aria-hidden="true" />
                    <span className="ripple" />
                  </a>
                </div>
              </div>
            </div>
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column p-5">
                <div className="boxcar-title wow fadeInUp mb-3">
                  <p className="title mb-2">About the brand</p>
                  <h2>Why choose {brand.name}?</h2>
                </div>
                <div className="row">
                  <div className="text mb-2 col-12">
                    <h6 className="title mb-2">Immersive technology</h6>
                    <p>
                      From plug-in hybrid electric powertrains to advanced
                      driver assistance systems and vehicle connected services,
                      Alfa Romeo provides you added comfort and control.
                    </p>
                  </div>
                  <div className="text col-12 mb-2">
                    <h6 className="title mb-2">
                      Authentic Italian driving experience
                    </h6>
                    <p>
                      Alfa Romeo cars are renowned for their authentic driving
                      experience, blending precision engineering with passionate
                      performance. The brand{"'"}s commitment to driver
                      engagement is evident in their responsive handling,
                      distinctive steering feedback, and exhilarating
                      acceleration.
                    </p>
                  </div>
                  <div className="text col-12">
                    <h6 className="title mb-2">Advanced safety features</h6>
                    <p>
                      All Alfa Romeo vehicles are equipped with cutting-edge
                      safety systems that intelligently monitor the vehicle’s
                      surroundings to help ensure control and driver and
                      passenger safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="AC1cREPIw_o"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
export default React.memo(BrandsChooseUs);
