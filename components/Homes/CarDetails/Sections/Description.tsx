import { Car } from "@/app/store/CarsForSale";
import Image from "next/image";
import React from "react";

export default function Description({ carItem }: { carItem: Car }) {
  return (
    <>
      <h4 className="title">Description</h4>
      <div className="text two">{carItem.description}</div>
      <ul className="des-list">
        <li>
          <span>
            <Image
              src="/images/resource/book1-1.svg"
              width={22}
              height={22}
              alt=""
            />
            View Vin Report
          </span>
        </li>
        <li className="two">
          <span>
            <Image
              src="/images/resource/book1-2.svg"
              width={22}
              height={22}
              alt=""
            />
            Car Brochure
          </span>
        </li>
      </ul>
    </>
  );
}
