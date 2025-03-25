"use client";
import { useBodiesStore } from "@/app/store/bodies";
import { useCitiesStore } from "@/app/store/Cities";
import { useInterestsStore } from "@/app/store/Interest";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./shopListStyles.module.css";

interface CarModel {
  cover: string;
  end_price: string;
  gallery: {
    id: number;
    model_id: number;
    model: string;
    image: string;
  }[];
  image: string;
  make: string;
  make_id: number;
  name: string;
  specifications: string[];
  start_price: string;
  status: string;
}

let currentPage: number = 1;
let totalPage: number = 1;
let ErrorMessage: string = "";

export default function ShopList() {
  const { bodies } = useBodiesStore();
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(10000000);
  const region: string = Cookies.get("region") || MainRegionName;
  const { interests, interestsLoading, getInterests } = useInterestsStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBody, setSelectedBody] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [currentCars, setCurrentCars] = useState<CarModel[]>([]);
  const [carLoading, setCarLoading] = useState<boolean>(false);
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === region)?.currency || "";

  const getAllInterests = useCallback(() => {
    if (interests.length === 0 && !interestsLoading) {
      getInterests();
    }
  }, [interests.length, interestsLoading, getInterests]);

  useEffect(() => {
    getAllInterests();
  }, [getAllInterests]);

  const handleInterestChange = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
    debounce(handleSubmit, 500);
  };

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(callback, delay);
    setDebounceTimeout(newTimeout);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBody(e.target.value);
    debounce(handleSubmit, 500);
  };

  const handleReset = () => {
    setSelectedInterests([]);
    setSelectedBody("");
  };

  const handleSubmit = useCallback(async () => {
    const formData: Record<string, unknown> = {};

    if (selectedInterests.length > 0) {
      formData.interest = selectedInterests;
    }

    if (selectedBody) {
      formData.body = [selectedBody];
    }
    if (priceFrom) {
      formData.price_from = priceFrom;
    }
    if (priceTo) {
      formData.price_to = priceTo;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    ErrorMessage = "";
    setCarLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/cars/perfect/match/search`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            code: region,
          },
        }
      );

      if (res.status === 200) {
        setCurrentCars(res.data.data.models);
        setCarLoading(false);
        if (res.data.data.current_page)
          currentPage = res.data.data.current_page;
        if (res.data.data.last_page) totalPage = res.data.data.last_page;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorMessage = error.response?.data.message;
        setCarLoading(false);
      }
    }
  }, [
    selectedInterests,
    selectedBody,
    priceFrom,
    priceTo,
    debounceTimeout,
    region,
  ]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);


  return (
    <section className={`cars-section-fourteen layout-radius`}>
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Perfect Match</span>
            </li>
          </ul>
          <h2>Perfect Match Cars List</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="side-bar">
              <div className="categories-box">
                <h6 className="title">Interests</h6>
                <div className="cheak-box">
                  {interests?.map((interest) => (
                    <label className="contain" key={interest?.id}>
                      {interest?.name}
                      <input
                        type="checkbox"
                        value={interest?.id}
                        checked={selectedInterests.includes(`${interest?.id}`)}
                        onChange={() => handleInterestChange(`${interest?.id}`)}
                      />
                      <span className="checkmark" />
                    </label>
                  ))}
                </div>
              </div>
              <div className="form_boxes accordion-flush p-3 border-1 border-bottom">
                <label htmlFor="SearchBody">Body Type</label>
                <select
                  className="form-select"
                  value={selectedBody}
                  onChange={handleBodyChange}
                  id="SearchBody"
                >
                  <option value="" disabled>
                    Select Body
                  </option>
                  {bodies.map((body) => (
                    <option key={body.id} value={body.id}>
                      {body.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="price-box">
                <h6 className="title">Price</h6>
                <div className="row">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label htmlFor="priceFrom">Min price</label>
                      <input
                        id="priceFrom"
                        type="number"
                        className="form-control border border-1 px-2"
                        name="price_from"
                        defaultValue={""}
                        placeholder={`${priceFrom}`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPriceFrom(+e?.target?.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label htmlFor="priceTo">Max price</label>
                      <input
                        type="number"
                        id="priceTo"
                        className="form-control border border-1 px-2"
                        name="price_to"
                        placeholder={`${priceTo}`}
                        defaultValue={""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPriceTo(+e?.target?.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  style={{ backgroundColor: "" }}
                  type="button"
                  className={`btn px-5 text-white py-2 fs-5 mb-4 w-100 ${styles.reset_btn}`}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="content-column col-lg-9 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="row">
                {ErrorMessage && <p className="text-danger">{ErrorMessage}</p>}
                {carLoading ? (
                  <div className="fs-4 fw-bold">Loading....</div>
                ) : (
                  currentCars?.map((product, index) => (
                    <div
                      key={index}
                      className="car-block-fourteen col-lg-4 col-md-6 col-sm-6"
                    >
                      <div className="inner-box">
                        <div className="image-box">
                          <figure className="image">
                            <Image
                              alt={product.name}
                              src={product.cover}
                              width={186}
                              height={186}
                            />
                          </figure>
                        </div>
                        <div className="content-box">
                          <div className="text">
                            {product.make} - {product.name}
                          </div>
                          <h6 className="title">
                            {currentCurrency} {product.end_price}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="pagination-sec">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li>
                      {currentPage} | {totalPage}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
