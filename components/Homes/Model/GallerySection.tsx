"use client";

import { Models } from "@/app/store/allModels";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./modelStyle.module.css";

export default function GallerySection({ model }: { model: Models }) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <section className={`${styles.sectionDiff} ${styles.section}`}>
      <div className="boxcar-container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Photo & video gallery for {model.name}</h2>
            <Gallery>
              <div className="gallery-sec">
                <div className="row">
                  <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="image-box">
                        <figure className="image">
                          <Item
                            original="/images/resource/inventory1-1.jpg"
                            thumbnail="/images/resource/inventory1-1.jpg"
                            width={805}
                            height={550}
                          >
                            {({ ref, open }) => (
                              <a onClick={open}>
                                <Image
                                  alt=""
                                  src="/images/resource/inventory1-1.jpg"
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
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="image-column-two item2 col-6">
                        <div className="inner-column">
                          <div className="image-box">
                            <figure className="image">
                              <Item
                                original="/images/resource/car-single-1.png"
                                thumbnail="/images/resource/car-single-1.png"
                                width={285}
                                height={269}
                              >
                                {({ ref, open }) => (
                                  <a onClick={open} className="fancybox">
                                    <Image
                                      ref={ref}
                                      alt=""
                                      src="/images/resource/inventory1-2.jpg"
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
                      <div className="image-column-two item3 col-6">
                        <div className="inner-column">
                          <div className="image-box">
                            <figure className="image">
                              <Item
                                original="/images/resource/car-single-2.png"
                                thumbnail="/images/resource/car-single-2.png"
                                width={285}
                                height={269}
                              >
                                {({ ref, open }) => (
                                  <a onClick={open}>
                                    <Image
                                      ref={ref}
                                      alt=""
                                      src="/images/resource/inventory1-3.png"
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
                      <div className="image-column-two item4 col-6">
                        <div className="inner-column">
                          <div className="image-box">
                            <figure className="image">
                              <Item
                                original="/images/resource/car-single-3.png"
                                thumbnail="/images/resource/car-single-3.png"
                                width={285}
                                height={269}
                              >
                                {({ ref, open }) => (
                                  <a
                                    href="/images/resource/car-single-3.png"
                                    onClick={open}
                                  >
                                    <Image
                                      ref={ref}
                                      alt=""
                                      src="/images/resource/inventory1-4.jpg"
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
                      <div className="image-column-two item5 col-6">
                        <div className="inner-column">
                          <div className="image-box">
                            <figure className="image">
                              <Item
                                original="/images/resource/car-single-4.png"
                                thumbnail="/images/resource/car-single-4.png"
                                width={285}
                                height={269}
                              >
                                {({ ref, open }) => (
                                  <a onClick={open}>
                                    <Image
                                      ref={ref}
                                      alt=""
                                      src="/images/resource/inventory1-5.png"
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
