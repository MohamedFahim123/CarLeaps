"use client";

import React, { useCallback, useState } from "react";
import Pagination from "../Common/Pagination";
import Image from "next/image";
import { CarsTypes } from "@/app/store/activecars";
import { debounce } from "@/app/utils/debounce";
import { useDeactiveCars } from "@/app/store/deactiveCars";

export default function DeactiveCars({ cars }: { cars: CarsTypes[] }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { searchCars, getDeactiveCars } = useDeactiveCars();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchCars, 500), [searchCars]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value) {
      debouncedSearch(value);
    } else {
      getDeactiveCars();
    }
  };

  return (
    <>
      <h1>Deactive Cars</h1>
      <div className="title-listing">
        <div className="box-ip-search">
          <span className="icon">
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.29301 0.287598C2.9872 0.287598 0.294312 2.98048 0.294312 6.28631C0.294312 9.59211 2.9872 12.2902 6.29301 12.2902C7.70502 12.2902 9.00364 11.7954 10.03 10.9738L12.5287 13.4712C12.6548 13.5921 12.8232 13.6588 12.9979 13.657C13.1725 13.6552 13.3395 13.5851 13.4631 13.4617C13.5867 13.3382 13.6571 13.1713 13.6591 12.9967C13.6611 12.822 13.5947 12.6535 13.474 12.5272L10.9753 10.0285C11.7976 9.00061 12.293 7.69995 12.293 6.28631C12.293 2.98048 9.59882 0.287598 6.29301 0.287598ZM6.29301 1.62095C8.87824 1.62095 10.9584 3.70108 10.9584 6.28631C10.9584 8.87153 8.87824 10.9569 6.29301 10.9569C3.70778 10.9569 1.62764 8.87153 1.62764 6.28631C1.62764 3.70108 3.70778 1.62095 6.29301 1.62095Z"
                fill="#050B20"
              />
            </svg>
          </span>
          <input type="text" onChange={handleSearch} placeholder="Search by name " value={searchValue} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Transmission</th>
            <th>FuelType</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="shop-cart-product">
                    <div className="shop-product-cart-img">
                      <Image alt={item.name} src={item.main_image} width={120} height={105} />
                    </div>
                    <div className="shop-product-cart-info">
                      <h3>
                        <a href="#" title={item.name}>
                          {item.name}
                        </a>
                      </h3>
                      <p>{item.description}</p>
                      <div className="price">
                        <span>{item.price}</span>
                        <del>{item.offer_price}</del>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{item.model}</span>
                </td>
                <td>
                  <span>{item.year}</span>
                </td>
                <td>
                  <span>{item.transmission}</span>
                </td>
                <td>
                  <span>{item.fuel_type}</span>
                </td>
                <td>
                  <a href="#" className="remove-cart-item">
                    <Image alt="Remove item" src={"/images/icons/remove.svg"} width={18} height={18} />
                  </a>
                  <a href="#" className="remove-cart-item">
                    <Image alt="Edit item" src={"/images/icons/edit.svg"} width={18} height={18} />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center " colSpan={6}>
                No Active Cars
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-sec">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <Pagination />
          </ul>
          <div className="text">Showing results 1-30 of 1,415</div>
        </nav>
      </div>
    </>
  );
}
