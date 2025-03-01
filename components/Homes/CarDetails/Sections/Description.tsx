import { Car } from "@/app/store/CarsForSale";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Description({ carItem }: { carItem: Car }) {
  return (
    <>
      <h4 className="title">Description</h4>
      <div className="text two">{carItem.description}</div>
      <ul className="des-list">
        <li>
          <Link href={carItem.history} target="_blank">
            <Image
              src="/images/resource/book1-1.svg"
              width={22}
              height={22}
              alt=""
            />
            View History Report
          </Link>
        </li>
      </ul>
    </>
  );
}
