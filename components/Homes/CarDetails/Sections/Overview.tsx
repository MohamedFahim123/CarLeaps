import { Car } from "@/app/store/CarsForSale";
import Image from "next/image";
import React from "react";

export default function Overview({ carItem }: { carItem: Car }) {
  const vehicleDetails: {
    icon: string;
    label: string;
    value: string;
    width: number;
    height: number;
  }[] = [
    {
      icon: "/images/resource/insep1-1.svg",
      label: "Body",
      value: carItem.body,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-2.svg",
      label: "Mileage",
      value: `${carItem.mileage} miles`,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-3.svg",
      label: "Fuel Type",
      value: carItem.fuel_type,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-4.svg",
      label: "Year",
      value: carItem.year,
      width: 16,
      height: 16,
    },
    {
      icon: "/images/resource/insep1-5.svg",
      label: "Transmission",
      value: carItem.transmission,
      width: 16,
      height: 16,
    },
  ];

  const vehicleAdditionalDetails = [
    {
      icon: "/images/resource/insep1-7.svg",
      label: "Condition",
      value: carItem.condition,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-6.svg",
      label: "Drive Type",
      value: carItem.drive_type,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-8.svg",
      label: "Engine Size",
      value: carItem.engine,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-11.svg",
      label: "Color",
      value: carItem.exterior,
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-12.svg",
      label: "VIN",
      value: carItem.vin,
      width: 18,
      height: 18,
    },
  ];

  return (
    <>
      <h4 className="title">Car Overview</h4>
      <div className="row">
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <Image
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleAdditionalDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <Image
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
