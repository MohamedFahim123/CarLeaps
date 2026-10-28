"use client";

import { ModelsDetailsInterface } from "@/app/store/ResearchCarMakes";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./modelStyle.module.css";
import styles2 from "../Home/heroStyles.module.css";

export default function GallerySection({
  model,
}: {
  model: ModelsDetailsInterface;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <section className={`${styles.sectionDiff} ${styles.section}`}>
      <div className="boxcar-container">
        <div className="row">
          <div className="col-12">
            <h2
              className={`${styles2.boxcar_title} fw-semibold text-capitalize mb-4`}
            >
              Photo & video gallery for {model.name}
            </h2>
            <Gallery>
              <div className="gallery-sec">
                <div className="row">
                  {model?.gallery[0]?.image && (
                    <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original={model?.gallery[0]?.image}
                              thumbnail={model?.gallery[0]?.image}
                              width={805}
                              height={550}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    alt="main Image"
                                    src={model?.gallery[0]?.image}
                                    width={805}
                                    height={550}
                                    ref={ref}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="row">
                      {model?.gallery[1]?.image && (
                        <div className="image-column-two item2 col-6">
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item
                                  original={model.gallery[1].image}
                                  thumbnail={model.gallery[1].image}
                                  width={285}
                                  height={269}
                                >
                                  {({ ref, open }) => (
                                    <a onClick={open} className="fancybox">
                                      <Image
                                        ref={ref}
                                        alt=""
                                        src={model.gallery[1].image}
                                        width={285}
                                        height={269}
                                      />
                                    </a>
                                  )}
                                </Item>
                              </figure>
                            </div>
                          </div>
                        </div>
                      )}
                      {model?.gallery[2]?.image && (
                        <div className="image-column-two item3 col-6">
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item
                                  original={model?.gallery[2]?.image}
                                  thumbnail={model?.gallery[2]?.image}
                                  width={285}
                                  height={269}
                                >
                                  {({ ref, open }) => (
                                    <a onClick={open}>
                                      <Image
                                        ref={ref}
                                        alt=""
                                        src={model?.gallery[2]?.image}
                                        width={285}
                                        height={269}
                                      />
                                    </a>
                                  )}
                                </Item>
                              </figure>
                            </div>
                          </div>
                        </div>
                      )}
                      {model?.gallery[3]?.image && (
                        <div className="image-column-two item4 col-6">
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item
                                  original={model?.gallery[3]?.image}
                                  thumbnail={model?.gallery[3]?.image}
                                  width={285}
                                  height={269}
                                >
                                  {({ ref, open }) => (
                                    <a onClick={open}>
                                      <Image
                                        ref={ref}
                                        alt=""
                                        src={model?.gallery[3]?.image}
                                        width={285}
                                        height={269}
                                      />
                                    </a>
                                  )}
                                </Item>
                              </figure>
                            </div>
                          </div>
                        </div>
                      )}
                      {model?.gallery[4]?.image && (
                        <div className="image-column-two item5 col-6">
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item
                                  original={model?.gallery[4]?.image}
                                  thumbnail={model?.gallery[4]?.image}
                                  width={285}
                                  height={269}
                                >
                                  {({ ref, open }) => (
                                    <a onClick={open}>
                                      <Image
                                        ref={ref}
                                        alt=""
                                        src={model?.gallery[4]?.image}
                                        width={285}
                                        height={269}
                                      />
                                    </a>
                                  )}
                                </Item>
                              </figure>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Gallery>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="7e90gBu4pas"
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
