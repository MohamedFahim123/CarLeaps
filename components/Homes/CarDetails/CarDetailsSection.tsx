"use client";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import Features from "../CarsForSale/Features";
import RelatedCars from "./RelatedCars";
import Description from "./Sections/Description";
import Faqs from "./Sections/Faqs";
import Financing from "./Sections/Financing";
import Location from "./Sections/Location";
import Overview from "./Sections/Overview";
import SideCard from "./Sections/SideCard";
import ImagesSection from "./Sections/ImagesSection";

export default function CarDetailsSection({
  carItem,
}: {
  carItem: { title: string };
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="boxcar-container">
          <ImagesSection carItem={carItem} setOpen={setOpen} />
          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="overview-sec">
                  <Overview />
                </div>
                <div className="description-sec">
                  <Description />
                </div>
              </div>
            </div>
            <SideCard />
            <div className="inspection-column col-lg-12">
              <div className="inner-column">
                <div className="features-sec">
                  <Features />
                </div>
                <div className="faqs-section pt-0">
                  <div className="inner-container">
                    <Faqs />
                  </div>
                </div>
                <div className="location-box">
                  <Location />
                </div>
                <div className="form-box">
                  <Financing />
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedCars />
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="7e90gBu4pas"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
