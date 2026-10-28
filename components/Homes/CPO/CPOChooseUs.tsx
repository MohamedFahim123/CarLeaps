import { CPOCarsMakes } from "@/app/store/cpoMakes";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import styles from "../Brands/Brands.module.css";
import { FaCheck } from "react-icons/fa";

const CPOChooseUs = ({ brand }: { brand: CPOCarsMakes }) => {
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
                    <Image alt="" src={brand.logo} width={836} height={800} />
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
                  <p className="title mb-2">Program Features</p>
                  <h2>Why choose {brand.name}?</h2>
                </div>
                <ul>
                  {brand.features.map((feature) => (
                    <li key={feature.title} className={styles.featureLi}>
                      <span className={styles.checkIcon}>
                        <FaCheck size={20} />
                      </span>
                      <span className="fs-5 fw-medium text-capitalize">{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={brand.video_link}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default CPOChooseUs;
