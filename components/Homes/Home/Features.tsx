"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
export default function Features() {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <section className="boxcar-pricing-section pb-0 pt-0">
        <div className="large-container">
          <div className="row g-0">
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/resource/pricing1-1.jpg"
                        width={836}
                        height={700}
                      />
                    </a>
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
              <div className="inner-column py-5">
                <div className="boxcar-title wow fadeInUp">
                  <h2 className="mb-3">Why CarLeaps?</h2>
                  <div className="text fw-semibold fs-5">
                    We{"'"}re redefining how cars are bought and sold—by making
                    trust, speed, and simplicity our standard.
                  </div>
                </div>
                <ul
                  className="list-style-one wow fadeInUp"
                  data-wow-delay="100ms"
                >
                  <li>
                    <i className="fa-solid fa-check" />
                    Whether you{"'"}re buying or selling, CarLeaps gives you the
                    confidence to act. Only Authorized Dealers Every listing is
                    from verified, professional showrooms—no random uploads.
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Transparent from Start to Finish What you see is what you
                    get. No hidden fees, no last-minute surprises.
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Request or Sell With Confidence Buyers can request cars,
                    sellers receive bids from trusted dealers—it’s your move.
                  </li>
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
        videoId="AC1cREPIw_o"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
