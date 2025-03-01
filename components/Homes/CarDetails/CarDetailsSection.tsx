"use client";
import { Car } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import RelatedCars from "./RelatedCars";
import Description from "./Sections/Description";
import Faqs from "./Sections/Faqs";
import Financing from "./Sections/Financing";
import ImagesSection from "./Sections/ImagesSection";
import Location from "./Sections/Location";
import Overview from "./Sections/Overview";
import SideCard from "./Sections/SideCard";

export default function CarDetailsSection({
  carItem,
  region,
}: {
  carItem: Car;
  region: string;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === region)?.currency || "";
  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="boxcar-container">
          <ImagesSection
            currentCurrency={currentCurrency}
            region={region}
            carItem={carItem}
          />
          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="overview-sec">
                  <Overview carItem={carItem} />
                </div>
                <div className="description-sec">
                  <Description carItem={carItem} />
                </div>
              </div>
            </div>
            <SideCard carItem={carItem} />
            <div className="inspection-column col-lg-12">
              <div className="inner-column">
                <div className="faqs-section pt-0">
                  <div className="inner-container">
                    <Faqs carItem={carItem} />
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
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId="7e90gBu4pas"
          onClose={() => setOpen(false)}
        />
        <RelatedCars />
      </section>
    </>
  );
}
